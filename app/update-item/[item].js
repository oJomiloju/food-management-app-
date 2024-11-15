import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";

const UpdateItem = () => {
  const { item } = useLocalSearchParams();
  const router = useRouter();

  const parsedItem = JSON.parse(decodeURIComponent(item));
  const [name, setName] = useState(parsedItem.name);
  const [status, setStatus] = useState(parsedItem.status);

  const handleUpdate = async () => {
    try {
      if (!auth.currentUser) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }

      const userDocRef = doc(firestore, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        Alert.alert("Error", "User data not found.");
        return;
      }

      const items = userDoc.data().items || [];
      const itemIndex = items.findIndex((i) => i.id === parsedItem.id);

      if (itemIndex === -1) {
        Alert.alert("Error", "Item not found.");
        return;
      }

      // Update the item
      const updatedItem = { ...items[itemIndex], name, status };
      const updatedItems = [...items];
      updatedItems[itemIndex] = updatedItem;

      await updateDoc(userDocRef, { items: updatedItems });

      Alert.alert("Success", "Item updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error updating item:", error);
      Alert.alert("Error", "Failed to update item. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Update Item</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Item Name"
        />
        <Text style={styles.label}>Status:</Text>
        <View style={styles.statusContainer}>
          {["Fresh", "Near Expiry", "Expires Soon"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.statusButton,
                status === option && styles.statusButtonSelected,
              ]}
              onPress={() => setStatus(option)}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  status === option && styles.statusButtonTextSelected,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateItem;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF3E0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C4033",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#5C4033",
    borderRadius: 8,
    padding: 10,
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
    width: "100%",
    marginBottom: 20,
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
  button: {
    backgroundColor: "#5C4033",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFF5E1",
    fontWeight: "bold",
    fontSize: 16,
  },
});
