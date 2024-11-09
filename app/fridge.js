import { SafeAreaView, View, Text, FlatList, StyleSheet, Image } from "react-native";
import chickenImg from "../assets/fridge/chicken.jpeg";
import eggsImg from "../assets/fridge/eggs.jpeg";
import grapesImg from "../assets/fridge/grapes.jpeg";
import bananasImg from "../assets/fridge/bananas.jpeg";
import cabbageImg from "../assets/fridge/cabbage.jpeg";
import baconImg from "../assets/fridge/bacon.jpeg";
import { Link } from "expo-router";
import homeImg from "../assets/home.png"; // Adjusted to a relevant home icon
import userImg from "../assets/user.png";
import scanImg from "../assets/scan.png";
import itemImg from "../assets/item.png"; // Import the new image for Items

const fridgeItems = [
  {
    id: "1",
    name: "Chicken",
    image: chickenImg,
    addedOn: "2023-11-05",
    status: "Fresh", // Green
  },
  {
    id: "2",
    name: "Eggs",
    image: eggsImg,
    addedOn: "2023-11-03",
    status: "Expires Soon", // Red
  },
  {
    id: "3",
    name: "Grapes",
    image: grapesImg,
    addedOn: "2023-11-01",
    status: "Fresh", // Green
  },
  {
    id: "4",
    name: "Bananas",
    image: bananasImg,
    addedOn: "2023-10-30",
    status: "Near Expiry", // Yellow
  },
  {
    id: "5",
    name: "Cabbage",
    image: cabbageImg,
    addedOn: "2023-11-06",
    status: "Fresh", // Green
  },
  {
    id: "6",
    name: "Bacon",
    image: baconImg,
    addedOn: "2023-10-28",
    status: "Expires Soon", // Red
  },
];

const Fridge = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={fridgeItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {/* Food Image */}
              <Image source={item.image} style={styles.foodImage} />

              {/* Food Details */}
              <View style={styles.detailsContainer}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.addedOn}>Added on: {item.addedOn}</Text>
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
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* Navigation Links */}
      <View style={styles.navigationContainer}>
          <Link href="/" style={styles.navLink}>
            <Image source={homeImg} style={styles.navImage} />
          </Link>
          <Link href="/fridge" style={styles.navLink}>
            <Image source={itemImg} style={styles.navImage} />
          </Link>
          <Link href="/scan-item" style={styles.navLink}>
            <Image source={scanImg} style={styles.navImage} />
          </Link>
          <Link href="/user" style={styles.navLink}>
            <Image source={userImg} style={styles.navImage} />
          </Link>
        </View>
    </SafeAreaView>
  );
};

export default Fridge;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#5C4033", // Caramel background
  },
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row", // Align image and details side by side
    backgroundColor: "#ffffff", // White card background
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  foodImage: {
    width: 80, // Adjust the image width
    height: 80, // Adjust the image height
    resizeMode: "contain", // Ensure the image fits within the bounds
    borderRadius: 10,
  },
  detailsContainer: {
    marginLeft: 15, // Space between the image and the details
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
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
    color: "green", // Green for fresh items
  },
  statusExpired: {
    color: "red", // Red for items that expire soon
  },
  statusNearExpiry: {
    color: "orange", // Yellow/Orange for near-expiry items
  },
  navigationContainer: {
    flexDirection: "row", // Layout items horizontally
    justifyContent: "space-around", // Distribute items evenly
    alignItems: "center", // Center items vertically
    paddingVertical: 15, // Add some padding for better spacing
    backgroundColor: "#5C4033", // Keep the caramel background
    borderTopWidth: 0, // Remove the border
  },
  navLink: {
    alignItems: "center", // Center each link (image and text, if applicable)
    justifyContent: "center",
    padding: 10,
  },
  navImage: {
    width: 24, // Adjust the width of the image
    height: 24, // Adjust the height of the image
    resizeMode: "contain", // Ensures the image fits within its bounds
  },
  navText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF8E1",
  },
});
