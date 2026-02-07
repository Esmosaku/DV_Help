// screens/DeviceSafetyCheck.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";
import DeviceInfo from "react-native-device-info";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Feather } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native";

export default function runSafetyCheck() {
  const navigation = useNavigation<any>();
  const [biometricAvailable, setBiometricAvailable] = useState<boolean | null>(
    null,
  );
  const [secureLockEnabled, setSecureLockEnabled] = useState<boolean | null>(
    null,
  );
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );
  const [micPermission, setMicPermission] = useState<boolean | null>(null);

  useEffect(() => {
    runChecks();
  }, []);

  const runChecks = async () => {
    await checkBiometrics();
    await checkSecureLock();
    await checkPermissions();
  };

  const checkBiometrics = async () => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const { available } = await rnBiometrics.isSensorAvailable();
      setBiometricAvailable(available);
    } catch {
      setBiometricAvailable(false);
    }
  };

  const checkSecureLock = async () => {
    try {
      const isSecure = await DeviceInfo.isPinOrFingerprintSet(); // true if lock screen is set
      setSecureLockEnabled(isSecure);
    } catch {
      setSecureLockEnabled(false);
    }
  };

  const checkPermissions = async () => {
    try {
      const cameraStatus = await check(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.CAMERA
          : PERMISSIONS.ANDROID.CAMERA,
      );
      setCameraPermission(cameraStatus === RESULTS.GRANTED);

      const micStatus = await check(
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      setMicPermission(micStatus === RESULTS.GRANTED);
    } catch {
      setCameraPermission(false);
      setMicPermission(false);
    }
  };

  const handleProceed = () => {
    if (
      biometricAvailable &&
      secureLockEnabled &&
      cameraPermission &&
      micPermission
    ) {
      alert("Device is safe ✅ You can proceed safely.");
    } else {
      alert(
        "Device safety warning ⚠️ Some safety features are missing. Proceed with caution.",
      );
    }

    navigation.goBack();
  };

  const renderStatus = (status: boolean | null) => {
    if (status === null)
      return <ActivityIndicator size="small" color="#007bff" />;
    return (
      <Feather
        name={status ? "check-circle" : "x-circle"}
        size={24}
        color={status ? "green" : "red"}
      />
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Device Safety Check</Text>

      <View style={styles.checkItem}>
        <Text style={styles.checkLabel}>Screen Lock Enabled:</Text>
        {renderStatus(secureLockEnabled)}
      </View>

      <View style={styles.checkItem}>
        <Text style={styles.checkLabel}>Biometric Authentication:</Text>
        {renderStatus(biometricAvailable)}
      </View>

      <View style={styles.checkItem}>
        <Text style={styles.checkLabel}>Camera Permission:</Text>
        {renderStatus(cameraPermission)}
      </View>

      <View style={styles.checkItem}>
        <Text style={styles.checkLabel}>Microphone Permission:</Text>
        {renderStatus(micPermission)}
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={runChecks}>
        <Text style={styles.buttonText}>Recheck</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2D2D2A",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, color: "#EDF6F9" },
  checkItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#7884AE",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    alignItems: "center",
  },
  checkLabel: { fontSize: 16 },
  buttonText: { color: "#EDF6F9", fontSize: 18 },
  refreshButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#6c757d",
    borderRadius: 10,
  },
  proceedButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#BDADEA",
    borderRadius: 10,
  },
});
