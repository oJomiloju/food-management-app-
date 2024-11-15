import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const ScanItem = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Item</Text>
      <Text style={styles.subHeader}>
        Choose how you want to add your item to the fridge:
      </Text>

      {/* Options for Input */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => router.push("/manual-input")}
      >
        <Text style={styles.optionText}>Manual Input</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => router.push("/automatic-scanning")}
      >
        <Text style={styles.optionText}>Automatic Scanning (Image/Text)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => router.push("/receipt-scanning")}
      >
        <Text style={styles.optionText}>Receipt Scanning</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScanItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0", // Light beige
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#5C4033", // Dark brown
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#7A5C45", // Warm brown
    textAlign: "center",
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: "#5C4033", // Dark brown
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  optionText: {
    fontSize: 16,
    color: "#FFF5E1", // Cream text
    fontWeight: "bold",
    textAlign: "center",
  },
});
