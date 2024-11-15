import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import { auth, firestore } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import userImg from "../assets/user.png";

const User = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(""); // State to store the username
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user data from Firestore
        const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username || "User"); // Get username or fallback to "User"
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Image source={userImg} style={styles.authImage} />
          <Text style={styles.loginText}>Welcome to Jasp!</Text>
          <Text style={styles.subText}>Log in or sign up to manage your fridge.</Text>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => router.push("/signup")}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image source={{ uri: user.photoURL || "default_profile_image_url" }} style={styles.profileImage} />
        <Text style={styles.userName}>{username}</Text> 
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Items in Fridge</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Expiring Soon</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Fresh Items</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>30%</Text>
            <Text style={styles.statLabel}>Waste Reduction</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Meal Preps</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF3E0", // Light beige
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  authImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5C4033",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#7A5C45",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#5C4033",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: "#7A5C45",
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF5E1",
    fontWeight: "bold",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#5C4033",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#5C4033",
    marginBottom: 20,
  },
  statsContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap", // Allow stats to wrap into the next row
    justifyContent: "space-between", // Add spacing between items
    marginBottom: 30,
  },
  statItem: {
    width: "45%", // Adjust width to make stats evenly spaced
    backgroundColor: "#FFF8E1",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Add subtle shadow for depth
  },
  statNumber: {
    fontSize: 22, // Slightly larger font for emphasis
    fontWeight: "bold",
    color: "#5C4033",
  },
  statLabel: {
    fontSize: 14,
    color: "#7A5C45",
    textAlign: "center",
    marginTop: 5,
  },
});
