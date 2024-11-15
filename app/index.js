import { SafeAreaView, View, Text, FlatList, StyleSheet, Image } from "react-native";
import charityImage from "../assets/Charity.jpeg"; // Path to your static image

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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: "#FAF3E0", // light beige
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
      color: "#5C4033", // dark brown
    },
    eventList: {
      paddingBottom: 10,
    },
    eventCard: {
      backgroundColor: "#E5D7C3", 
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
      color: "#5C4033", // dark brown
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
      color: "#5c4033", // olive green
      textAlign: "center",
    },
  });
  