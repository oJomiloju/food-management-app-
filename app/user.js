import { SafeAreaView, View, Text, StyleSheet, Image } from "react-native";
import { Link } from "expo-router";
import homeImg from "../assets/home.png"; // Adjusted to a relevant home icon
import userImg from "../assets/user.png";
import scanImg from "../assets/scan.png";
import itemImg from "../assets/item.png"; // Import the new image for Items

const userProfile = {
  name: "Amanda",
  profileImage: require("../assets/user-profile.jpeg"), // Replace with your actual image path
  stats: {
    itemsInFridge: 15,
    expiringSoon: 3,
    freshItems: 10,
    wasteReduction: 85, // Percentage
    mealPreps: 5,
  },
};

const User = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Profile Picture */}
        <Image source={userProfile.profileImage} style={styles.profileImage} />

        {/* User Name */}
        <Text style={styles.userName}>{userProfile.name}</Text>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.itemsInFridge}</Text>
            <Text style={styles.statLabel}>Items in Fridge</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.expiringSoon}</Text>
            <Text style={styles.statLabel}>Expiring Soon</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.freshItems}</Text>
            <Text style={styles.statLabel}>Fresh Items</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.wasteReduction}%</Text>
            <Text style={styles.statLabel}>Waste Reduction</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{userProfile.stats.mealPreps}</Text>
            <Text style={styles.statLabel}>Meal Preps</Text>
          </View>
        </View>
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

export default User;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#5C4033", // Caramel background
  },
  container: {
    flex: 1,
    alignItems: "center", // Center all content horizontally
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes the image circular
    marginBottom: 20,
  },
  userName: {
    fontSize: 24, // Larger font size for the name
    fontWeight: "bold",
    color: "#FFF5E1",
    marginBottom: 30,
  },
  statsContainer: {
    width: "100%", // Ensures stats span the full width
    flexDirection: "row",
    flexWrap: "wrap", // Allows items to wrap to the next line
    justifyContent: "space-between", // Distributes items evenly
  },
  statItem: {
    width: "45%", // Each item takes half the width
    backgroundColor: "#FFF8E1", // Light caramel background
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5C4033",
  },
  statLabel: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 5,
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
