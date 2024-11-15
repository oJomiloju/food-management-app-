import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker"; // Image picker for taking/uploading photos
import { auth, firestore, storage } from "../firebase"; // Import Firebase
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const ManualInput = () => {
  const [itemName, setItemName] = useState("");
  const [status, setStatus] = useState("Fresh"); // Default status
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Function to pick an image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Function to take a photo
  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "Camera permission is required to take photos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Function to upload image to Firebase Storage
  const uploadImage = async () => {
    if (!image) return null;

    const filename = `${new Date().getTime()}-${itemName}.jpg`;
    const storageRef = ref(storage, `images/${filename}`);

    const img = await fetch(image);
    const bytes = await img.blob();

    await uploadBytes(storageRef, bytes);
    return getDownloadURL(storageRef);
  };

  // Function to save item to Firestore
  const handleAddItem = async () => {
    if (!itemName) {
      Alert.alert("Validation Error", "Item name is required.");
      return;
    }

    setUploading(true);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        Alert.alert("Error", "You must be logged in to add items.");
        return;
      }

      const imageUrl = await uploadImage();
      const newItem = {
        id: `${Date.now()}`, // Unique ID for the item
        name: itemName,
        status,
        addedOn: new Date().toISOString(),
        image: imageUrl || null,
      };

      const userDocRef = doc(firestore, "users", currentUser.uid);

      await updateDoc(userDocRef, {
        items: arrayUnion(newItem),
      });

      Alert.alert("Success", "Item added to fridge!");
      setItemName("");
      setImage(null);
      setStatus("Fresh");
    } catch (error) {
      console.error("Error adding item:", error);
      Alert.alert("Error", "Failed to add item. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Item to Fridge</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <Text style={styles.label}>Status:</Text>
      <View style={styles.statusContainer}>
        {["Fresh", "Near Expiry", "Expires Soon"].map((statusOption) => (
          <TouchableOpacity
            key={statusOption}
            style={[
              styles.statusButton,
              status === statusOption && styles.statusButtonSelected, // Apply selected style
            ]}
            onPress={() => setStatus(statusOption)}
          >
            <Text
              style={[
                styles.statusButtonText,
                status === statusOption && styles.statusButtonTextSelected, // Change text color
              ]}
            >
              {statusOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, styles.submitButton]}
        onPress={handleAddItem}
        disabled={uploading}
      >
        <Text style={styles.buttonText}>{uploading ? "Adding..." : "Add Item"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManualInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5C4033",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#5C4033",
    borderRadius: 8,
    padding: 10,
    width: "100%",
    marginBottom: 15,
    backgroundColor: "#FFF5E1",
  },
  label: {
    fontSize: 16,
    color: "#5C4033",
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    width: "100%",
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#5C4033",
    borderRadius: 8,
    backgroundColor: "#FFF5E1",
  },
  statusButtonSelected: {
    backgroundColor: "#5C4033",
  },
  statusButtonText: {
    color: "#5C4033",
    fontWeight: "bold",
  },
  statusButtonTextSelected: {
    color: "#FFF5E1",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#5C4033",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFF5E1",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#7A5C45",
  },
});
