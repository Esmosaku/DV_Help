import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Navbar from "../../assets/components/NavBar";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";


export default function HomeScreen() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0A1A3A", "#2D2D2A"]} // top → bottom
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      ></LinearGradient>
      <Text style={styles.title}>Dashboard</Text>

      <TouchableOpacity style={styles.profileCard}>
        <Text style={styles.profileCardText}>Welcome Jane</Text>
        <Text style={{ fontSize: 18, color: "#EDF6F9" }}>Plan Status:</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>Emergency Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardText}>Safe Places</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("support")}
      >
        <Text style={styles.cardText}>Resources</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          Linking.openURL(
            "https://www.google.com/search?q=weather&sca_esv=47422b062f7ec537&sxsrf=ANbL-n7kLCB4J5lwDVC8Ge81j23tKZOx5A%3A1770511911713&ei=J96HaZabK9ur0PEPhebq8AU&ved=0ahUKEwjWysXs1siSAxXbFTQIHQWzGl4Q4dUDCBQ&uact=5",
          )
        }
      >
        <Text style={styles.cardText}>Quick Exit</Text>
      </TouchableOpacity>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2A",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 40,
    color: "#EDF6F9",
  },
  card: {
    backgroundColor: "#7884AE",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  profileCard: {
    backgroundColor: "#19233E",
    padding: 20,
    height: 100,
    borderRadius: 12,
    marginBottom: 16,
  },
  profileCardText: {
    fontSize: 24,
    color: "#EDF6F9",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 18,
    color: "#21241E",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 190,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
});
