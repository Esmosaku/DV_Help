import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import Navbar from "../../assets/components/NavBar";
import { LinearGradient } from "expo-linear-gradient";

export default function Documents({ navigation }) {
  const [search, setSearch] = useState("");

  const savedDocs = [
    { id: "1", name: "Passport" },
    { id: "2", name: "Evidence 2/01/2026" },
    { id: "3", name: "Prescription" },
    { id: "4", name: "Apple ID passwords" },
    { id: "5", name: "Birth Certificate" },
    { id: "6", name: "Drivers License" },
    { id: "7", name: "Social Security Card" },
    { id: "8", name: "Debit Card" },
    { id: "9", name: "Tax Return 2025" },
    { id: "10", name: "SNAP Card" },
    { id: "11", name: "Lease Documents" },
  ];

  const filteredDocs = savedDocs.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.rowText}>{item.name}</Text>
      <Text style={styles.chevron}>{">"}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0A1A3A", "#2D2D2A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      />

      <Text style={styles.title}>Documents</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search documents..."
        placeholderTextColor="#EDF6F9"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredDocs} // ← FIXED
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2A",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    color: "#EDF6F9",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF6F9",
  },
  rowText: {
    fontSize: 18,
    color: "#EDF6F9",
  },
  chevron: {
    fontSize: 22,
    color: "#EDF6F9",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 190,
  },
  searchBar: {
    width: "100%",
    backgroundColor: "#7884AE",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#000",
  },
});
