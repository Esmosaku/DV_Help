import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setLocation } from "../../App";


export default function SetLocationScreen() {
  const navigation = useNavigation<any>();
  const [manualLocation, setManualLocation] = useState("");

  const handleUseCurrentLocation = async () => {
    try {
      // TODO: Save or use the location
      throw new Error("Location access not implemented yet");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Could not get location.");
      console.log(error);
    }
  };

  const handleSaveManualLocation = () => {
    if (!manualLocation.trim()) {
      Alert.alert("Error", "Please enter a location.");
      return;
    }
  
    Alert.alert("Saved", `Location: ${manualLocation}`);
    setLocation(manualLocation);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          name="chevron-left"
          size={28}
          color="#EDF6F9"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Device Safety</Text>
      </View>

      <Text style={styles.subtitle}>
        You can enter your location manually or use your current location. Using
        your current location is optional and temporary.
      </Text>

      {/* Manual input */}
      <TextInput
        style={styles.input}
        placeholder="Enter city, ZIP, or neighborhood"
        placeholderTextColor="#888"
        value={manualLocation}
        onChangeText={setManualLocation}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSaveManualLocation}
      >
        <Text style={styles.buttonText}>Save Manual Location</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleUseCurrentLocation}
      >
        <Text style={styles.buttonText}>Use My Current Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2A",
    padding: 20,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 20,
    gap: 10,
  },
  headerText: { fontSize: 28, fontWeight: "600", color: "#EDF6F9" },
  subtitle: { fontSize: 16, color: "#7884AE", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#BDADEA",
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    color: "#EDF6F9",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#BDADEA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33,
    width: "100%",
    height: 60,
    marginBottom: 15,
  },
  buttonText: { color: "#EDF6F9", fontWeight: "600", fontSize: 18 },
  orText: {
    color: "#7884AE",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 10,
  },
});
