import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("HomeScreen")  }>
        <Feather name="home" size={24} color="#7884AE" />
        <Text style={styles.label}>Home</Text>
      </TouchableOpacity>

      {/* Documents */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("documents") }>
        <Feather name="file-text" size={24} color="#7884AE" />
        <Text style={styles.label}>Documents</Text>
      </TouchableOpacity>

      {/* Center Add Button */}
      <TouchableOpacity style={styles.centerButton  } onPress={() => navigation.navigate("addDocument")}>
        <Feather name="plus" size={32} color="#EDF6F9" />
      </TouchableOpacity>

      {/* Alert */}
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("alert")}  >
        <Feather name="bell" size={24} color="#7884AE" />
        <Text style={styles.label}>Alert</Text>
      </TouchableOpacity>

      {/* Plan */}
      <TouchableOpacity style={styles.item}>
        <Feather name="clipboard" size={24} color="#7884AE" />
        <Text style={styles.label}>Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#19233E", 
    height: 100,
    
    alignItems: "center",
    justifyContent: "space-around",
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#7884AE",
    fontSize: 8,
    marginTop: 4,
  },
  centerButton: {
    width: 60,
    height: 60,
    backgroundColor: "#BDADEA", // purple
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // lifts it up slightly
  },
});
