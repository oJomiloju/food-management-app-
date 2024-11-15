import { Slot, useRouter } from "expo-router";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import homeImg from "../assets/home.png";
import userImg from "../assets/user.png";
import scanImg from "../assets/scan.png";
import itemImg from "../assets/item.png";

const Layout = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Screen Content */}
      <View style={styles.screenContent}>
        <Slot />
      </View>

      {/* Navigation Bar */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image source={homeImg} style={styles.navImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/fridge")}>
          <Image source={itemImg} style={styles.navImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/scan-item")}>
          <Image source={scanImg} style={styles.navImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/user")}>
          <Image source={userImg} style={styles.navImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0", // Light beige background
  },
  screenContent: {
    flex: 1,
    marginBottom: 10, // Add spacing above the navigation bar
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15, // Increase padding for spacing
    backgroundColor: "#FAF3E0", // Light beige
    borderTopWidth: 1,
    borderTopColor: "#7A5C45", // Brownish border
  },
  navImage: {
    width: 30,
    height: 30,
    tintColor: "#5C4033", // Brown icons
  },
});

export default Layout;

