import React from "react";
import { SafeAreaView, View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

const ItemDetails = () => {
  const { item } = useLocalSearchParams(); // Get the item from the URL parameters
  const parsedItem = item ? JSON.parse(item) : null; // Parse the stringified item

  if (!parsedItem) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Item details could not be found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "Fresh":
        return styles.statusFresh;
      case "Near Expiry":
        return styles.statusNearExpiry;
      case "Expires Soon":
        return styles.statusExpired;
      default:
        return styles.statusDefault;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {parsedItem.image ? (
            <Image
              source={{ uri: parsedItem.image }}
              style={styles.image}
            />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>
        <Text style={styles.name}>{parsedItem.name}</Text>
        <Text style={styles.detailText}>
          Added on: {new Date(parsedItem.addedOn).toISOString().split("T")[0]}
        </Text>
        <Text style={[styles.detailText, styles.statusText, getStatusStyle(parsedItem.status)]}>
          Status: {parsedItem.status}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF3E0",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5C4033",
    backgroundColor: "#FAF3E0", // Light beige background
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 8,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C4033",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#7A5C45",
    marginBottom: 5,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 10,
  },
  statusFresh: {
    color: "green",
  },
  statusNearExpiry: {
    color: "orange",
  },
  statusExpired: {
    color: "red",
  },
  statusDefault: {
    color: "#7A5C45",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
