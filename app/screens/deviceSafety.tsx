import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { factoryReset } from "../utils/factoryReset";

export default function DeviceSafetyScreen() {
  const navigation = useNavigation<any>();
  const [showConfirm, setShowConfirm] = useState(false);
  const handleWipe = async () => {
    await factoryReset();
    setShowConfirm(false);
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0A1A3A", "#2D2D2A"]} // top → bottom
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.gradient}
      ></LinearGradient>

      <View style={styles.header}>
        <Feather
          name="chevron-left"
          size={28}
          color="#EDF6F9"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Device Safety</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Safety Controls</Text>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("runSafetyCheck")}
        >
          <Text style={styles.rowText}>Run Device Safety Check</Text>
          <Feather name="chevron-right" size={22} color="#999999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("newPassword")}
        >
          <Text style={styles.rowText}>Change Password</Text>
          <Feather name="chevron-right" size={22} color="#999999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("setLocation")}
        >
          <Text style={styles.rowText}>Set Location</Text>
          <Feather name="chevron-right" size={22} color="#999999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Add Contact</Text>
          <Feather name="plus" size={22} color="#999999" />
        </TouchableOpacity>

        {/* Danger Action */}
        <TouchableOpacity
          style={[styles.dangerRow, { alignItems: "center" }]}
          onPress={() => setShowConfirm(true)}
        >
          <Text style={[styles.dangerText]}>Wipe Data</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={showConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Wipe All Data?</Text>
            <Text style={styles.modalMessage}>
              This will erase all app data and cannot be undone.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmBtn} onPress={handleWipe}>
                <Text style={styles.confirmText}>Wipe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2A",
  },

  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 190,
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingTop: 50,
    paddingBottom: 20,
    gap: 10,
  },

  headerText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#EDF6F9",
  },

  content: {
    paddingHorizontal: 22,
    paddingTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7884AE",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  rowText: {
    fontSize: 17,
    color: "#EDF6F9",
  },

  dangerRow: {
    paddingVertical: 18,
  },

  dangerText: {
    fontSize: 17,
    color: "#D9534F",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#EDF6F9",
    marginBottom: 10,
  },
  modalMessage: { fontSize: 15, color: "#C7D3DD", marginBottom: 20 },
  modalButtons: { flexDirection: "row", justifyContent: "flex-end", gap: 15 },
  cancelBtn: { paddingVertical: 8, paddingHorizontal: 14 },
  cancelText: { color: "#C7D3DD", fontSize: 16 },
  confirmBtn: {
    backgroundColor: "#D9534F",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  confirmText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
