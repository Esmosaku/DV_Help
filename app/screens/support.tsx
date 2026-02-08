import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { LOCATION } from "../../App";
import { useNavigation } from "@react-navigation/native";


type Resource = {
  title: string;
  description: string;
  link?: string;
};

const resources: Resource[] = [
  {
    title: "Talk to Someone",
    description:
      "Call or chat with trained advocates 24/7. Confidential and free.",
    link: "tel:1-800-799-7233", // National DV Hotline
  },
  {
    title: "Local Help",
    description:
      "Find shelters, counseling, and community resources near " + LOCATION,
    link: "https://jwcenter.org/",
  },
  {
    title: "Know Your Rights",
    description:
      "Learn about legal protections, restraining orders, immigration rights, and more.",
    link: "https://www.nwirp.org/",
  },
  {
    title: "Legal Aid",
    description:
      "Access free or low-cost legal representation and advocacy programs.",
    link: "https://www.lsc.gov/what-legal-aid/find-legal-aid",
  },
  {
    title: "Mental Health Support",
    description: "Get trauma-informed counseling and therapy resources.",
    link: "https://www.mentalhealth.gov/get-help",
  },
  {
    title: "Community & Peer Support",
    description:
      "Connect with culturally-specific groups and peer networks for survivors near " +
      LOCATION,
    link: "https://www.nowseattle.org/resources",
  },
];

export default function support() {
  const navigation = useNavigation<any>();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const openLink = (link?: string) => {
    if (link) Linking.openURL(link).catch(() => alert("Unable to open link"));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0A1A3A", "#2D2D2A"]} // top → bottom
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.header}
      ></LinearGradient>
      <View style={styles.headerContent}>
        <Feather
          name="chevron-left"
          size={28}
          color="#EDF6F9"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Resources</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {resources.map((res, index) => (
          <View key={index} style={styles.accordion}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.accordionTitle}>{res.title}</Text>
              <Feather
                name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                size={20}
                color="#333"
              />
            </TouchableOpacity>

            {expandedIndex === index && (
              <View style={styles.accordionContent}>
                <Text style={styles.description}>{res.description}</Text>
                {res.link && (
                  <TouchableOpacity onPress={() => openLink(res.link)}>
                    <Text style={styles.link}>Learn More / Contact</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2A",
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
    padding: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "baseline",
    paddingTop: 20,
    gap: 10,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 40,
    color: "#EDF6F9",
  },
  accordion: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#19233E",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#7884AE",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#7884AE",
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  accordionContent: {
    padding: 15,
    backgroundColor: "#ccd2e6",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    fontSize: 16,
    color: "#4a90e2",
    fontWeight: "bold",
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
