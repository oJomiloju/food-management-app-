import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../firebase";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { useRouter } from "expo-router"; // For navigation

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // New username field
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    if (!email || !password || !username) {
      setError("All fields are required.");
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user document to Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        username: username, // Save the username
        items: [], // Initialize with an empty fridge items array
      });

      Alert.alert("Success", "Account created successfully!");
      router.push("/login"); // Redirect to login screen
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>Already have an account? Log in here.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FAF3E0" },
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#5C4033", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#5C4033", borderRadius: 8, padding: 10, marginBottom: 15, backgroundColor: "#FFF5E1" },
  button: { backgroundColor: "#5C4033", padding: 15, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  buttonText: { color: "#FFF5E1", fontWeight: "bold", fontSize: 16 },
  link: { color: "#5C4033", fontSize: 14, textAlign: "center", marginTop: 10, textDecorationLine: "underline" },
  error: { color: "red", textAlign: "center", marginBottom: 15 },
});
