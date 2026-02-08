import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import { useEmergency } from "../utils/EmergencyContext";

import Navbar from "../../assets/components/NavBar";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";



export default function EmergencyAlert() {
  const { contacts } = useEmergency();

  const sendAlert = () => {
    if (contacts.length === 0) {
      //Alert.alert("No contacts set", "Please add emergency contacts first.");
      Alert.alert(
        "Emergency Alert",
        "Alert sent to contacts",)
      return;
    }

    contacts.forEach((contact) => {
      // For now just an in-app alert
      Alert.alert(
        "Emergency Alert",
        `Alert sent to ${contact.name}${contact.email ? " (" + contact.email + ")" : ""}`,
      );

      
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0A1A3A", "#2D2D2A"]} // top → bottom
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      ></LinearGradient>
      <Text style={styles.title}>Emergency Alert</Text>

      <TouchableOpacity style={styles.card} onPress={sendAlert}>
        <Feather name="bell" size={125} color="#EDF6F9" />
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
  card: {
    backgroundColor: "#EF946C",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    width: "55%",
    height: 200,
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 200,
    marginTop: 50,
    color: "#EDF6F9",
  },
});
