import { SafeAreaView, View, Text, FlatList, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import charityImage from "../assets/Charity.jpeg"; // Path to your static image
import homeImg from "../assets/home.png"; // Adjusted to a relevant home icon
import userImg from "../assets/user.png";
import scanImg from "../assets/scan.png";
import itemImg from "../assets/item.png"; // Import the new image for Items

const charityEvents = [
  { id: "1", title: "Local Food Drive", type: "Community Center" },
  { id: "2", title: "Canned Goods Collection", type: "Downtown Shelter" },
  { id: "3", title: "Soup Kitchen Support", type: "Main Street Church" },
  { id: "4", title: "Holiday Food Drive", type: "City Hall" },
  { id: "5", title: "Emergency Relief Donations", type: "Red Cross HQ" },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Charity Events Section */}
        <View style={styles.eventsContainer}>
          <Text style={styles.header}>Charity Events Nearby</Text>
          <FlatList
            data={charityEvents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Image source={charityImage} style={styles.eventImage} />
                <Text style={styles.eventType}>{item.type}</Text>
              </View>
            )}
            contentContainerStyle={styles.eventList}
            showsVerticalScrollIndicator={false} // Hides the vertical scroll indicator
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#5C4033", // Caramel background
  },
  container: {
    flex: 1,
  },
  eventsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#FFF8E1", // Light caramel
  },
  eventList: {
    paddingBottom: 10,
  },
  eventCard: {
    backgroundColor: "#FFF8E1", // Light caramel for cards
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center", // Center-align card content
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5C4033",
  },
  eventImage: {
    width: 200,
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  eventType: {
    fontSize: 14,
    color: "#8B5A2B",
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
