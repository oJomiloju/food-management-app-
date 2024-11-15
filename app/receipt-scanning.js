import { View, Text, StyleSheet } from "react-native";

const ReceiptScanning = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Receipt Scanning</Text>
      <Text style={styles.subHeader}>
        Scan your receipt to automatically extract item details.
      </Text>
      {/* Receipt scanning functionality will go here */}
    </View>
  );
};

export default ReceiptScanning;

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
  },
});
