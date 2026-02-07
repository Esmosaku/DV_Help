import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DocumentPicker from "react-native-document-picker";
import Navbar from "../../assets/components/NavBar";
import { launchCamera } from "react-native-image-picker";

export default function AddDocumentsScreen() {
  const [file, setFile] = useState(null);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFile(res[0]);
      // Upload to backend here if needed
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log("User cancelled");
      } else {
        console.error(err);
      }
    }
  };

  const takePhoto = async () => { 
    const result = await launchCamera({ 
        mediaType: "photo", 
        cameraType: "back", 
        quality: 0.8, 
        saveToPhotos: true, }); 
        if (result.didCancel) return; 
        if (result.assets && result.assets.length > 0) { 
            const photo = result.assets[0]; 
            setFile({ name: photo.fileName || "photo.jpg", uri: photo.uri, type: photo.type || "image/jpeg", }); 
        } 
    };

  return (
    <View style={styles.container}>
      <View style={styles.dropzone}>
        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>

        <Text style={{fontSize: 16, marginVertical: 20, color: "#EDF6F9" }}>or</Text>
        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Text style={styles.uploadText}>Take Photo</Text>
        </TouchableOpacity>
      </View>

      {file && <Text style={styles.fileName}>Selected: {file.name}</Text>}

      <Navbar />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
  },
  dropzone: {
    flex: 1,
    backgroundColor: "#2D2D2A",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "#BDADEA",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  uploadText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  fileName: {
    marginTop: 20,
    fontSize: 16,
    color: "#444",
  },

  cameraButton: {
    backgroundColor: "#7884AE",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
});
