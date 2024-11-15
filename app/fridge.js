import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { auth, firestore } from "../firebase";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useRouter } from "expo-router";
import deleteImg from "../assets/delete.png"; // Delete icon
import updateImg from "../assets/update.png"; // Update icon

const Fridge = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const router = useRouter();

  useEffect(() => {
    // Monitor authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchFridgeItems(currentUser.uid);
      } else {
        setItems([]);
        setLoading(false); // No user, stop loading
      }
    });

    return unsubscribe;
  }, []);

  const fetchFridgeItems = async (userId) => {
    try {
      const userDoc = await getDoc(doc(firestore, "users", userId));
      if (userDoc.exists()) {
        setItems(userDoc.data().items || []);
      } else {
        console.log("No items found for this user.");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false); // Loading complete
    }
  };

  const deleteItem = async (item) => {
    if (!user) return;

    try {
      const userDocRef = doc(firestore, "users", user.uid);
      await updateDoc(userDocRef, {
        items: arrayRemove(item), // Remove the item from the array in Firestore
      });

      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id)); // Update state locally
      Alert.alert("Success", `${item.name} has been deleted.`);
    } catch (error) {
      console.error("Error deleting item:", error);
      Alert.alert("Error", "Failed to delete item. Please try again.");
    }
  };

  const handleItemPress = (item) => {
    console.log("Item pressed:", item);
    router.push(`/item/${encodeURIComponent(JSON.stringify(item))}`);
  };

  const handleUpdatePress = (item) => {
    router.push(`/update-item/${encodeURIComponent(JSON.stringify(item))}`);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#5C4033" />
          <Text style={styles.loadingText}>Loading your fridge items...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.message}>You need to log in to view your fridge items.</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/user")}>
            <Text style={styles.buttonText}>Log In or Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {items.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.message}>Your fridge is empty!</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/scan-item")}>
              <Text style={styles.buttonText}>Add Items</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() => handleItemPress(item)}
                  style={styles.itemInfoContainer}
                >
                  <Image
                    source={item.image ? { uri: item.image } : null}
                    style={styles.foodImage}
                  />
                  <View style={styles.detailsContainer}>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.addedOn}>
                      Added on: {new Date(item.addedOn).toISOString().split("T")[0]}
                    </Text>
                    <Text
                      style={[
                        styles.status,
                        item.status === "Fresh" && styles.statusFresh,
                        item.status === "Expires Soon" && styles.statusExpired,
                        item.status === "Near Expiry" && styles.statusNearExpiry,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.actionsContainer}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => deleteItem(item)}
                  >
                    <Image source={deleteImg} style={styles.icon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleUpdatePress(item)}
                  >
                    <Image source={updateImg} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Fridge;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF3E0",
  },
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#5C4033",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    color: "#5C4033",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#5C4033",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF5E1",
    fontWeight: "bold",
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF5E1",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  itemInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  foodImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 10,
  },
  detailsContainer: {
    marginLeft: 15,
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5C4033",
  },
  addedOn: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
  statusFresh: {
    color: "green",
  },
  statusExpired: {
    color: "red",
  },
  statusNearExpiry: {
    color: "orange",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginHorizontal: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
