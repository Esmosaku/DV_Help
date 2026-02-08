import {View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput} from "react-native"
import React, {useState} from "react"
import { useNavigation } from "@react-navigation/native"
import Navbar from "../../assets/components/NavBar";
import { LinearGradient } from "expo-linear-gradient";

export default function PlanScreen(){
    const navigation: any = useNavigation()
    const [docsOpen, setDocsOpen] = useState(true)
    const [contactsOpen, setContactsOpen] = useState(false)
    const [transportOpen, setTransportOpen] = useState(false)
    const [moneyOpen, setMoneyOpen] = useState(false);

    const initialDocs = ["ID/ Driver's License", "Birth Certificate", "Medical Records", "Insurance Cards"]
    const [checked, setChecked] = useState<Record<string, boolean>>({})
    const [userDocs, setUserDocs] = useState<string[]>([]);
    const [newDoc, setNewDoc] = useState("");

    const toggleChecked = (item: string) =>{
        setChecked(prev => ({...prev, [item]: !prev[item]}))
    }
    type Contact = { id: string; name: string; phone: string }
    const [contacts, setContacts] = useState<Contact[]>([])
    const [showContactForm, setShowContactForm] = useState(false)
    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState("")

    const [packingOpen, setPackingOpen] = useState(false);
    const [packingItems, setPackingItems] = useState<string[]>([]);
    const [newPackingItem, setNewPackingItem] = useState("");


    const addDoc = () => {
      if (!newDoc.trim()) {
        alert("Enter a document name");
        return;
      }
      setUserDocs((prev) => [newDoc.trim(), ...prev]);
      setNewDoc("");
    };

    const removeDoc = (doc: string) => {
      setUserDocs((prev) => prev.filter((d) => d !== doc));
    };


    const addContact = () => {
        if(!newName.trim() || !newPhone.trim()){
            alert("Please enter a name and a phone number")
            return
        }
        const c: Contact ={
            id: String(Date.now()),
            name: newName.trim(),
            phone: newPhone.trim()
        }
        setContacts(prev => [c, ...prev])
        setNewName("")
        setNewPhone("")
        setShowContactForm(false)
    }
    const [area, setArea] = useState("")

    const [moneySaved, setMoneySaved] = useState<number>(0);
    const [newAmount, setNewAmount] = useState("");

    let SAVINGS_GOAL = 5000;
    const progress = Math.min(moneySaved / SAVINGS_GOAL, 1);

    const addMoney = () => {
      const amount = parseFloat(newAmount);
      if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid positive number");
        return;
      }
      setMoneySaved((prev) => prev + amount);
      setNewAmount("");
    };

    const addPackingItem = () => {
      if (!newPackingItem.trim()) {
        alert("Enter an item to add");
        return;
      }
      setPackingItems((prev) => [newPackingItem.trim(), ...prev]);
      setNewPackingItem("");
    };

    const removePackingItem = (item: string) => {
      setPackingItems((prev) => prev.filter((i) => i !== item));
    };


    return (
      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={["#0A1A3A", "#2D2D2A"]} // top → bottom
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.header}
        ></LinearGradient>

        <Text style={styles.title}>My Plan</Text>

        {/* Content */}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.subtitle}>
            See details about what makes a successful plan. Adjust to your
            needs.
          </Text>
          {/* Documents Section */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setDocsOpen((v) => !v)}
          >
            <Text style={styles.sectionTitle}>Important Documents</Text>
            <Text style={styles.chevron}>{docsOpen ? "▾" : "▸"}</Text>
          </TouchableOpacity>
          {docsOpen && (
            <View style={styles.sectionBody}>
              {/* Add new document */}
              <View style={{ flexDirection: "row", marginBottom: 8 }}>
                <TextInput
                  placeholder="New document"
                  value={newDoc}
                  onChangeText={setNewDoc}
                  placeholderTextColor="#999999"
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                />
                <TouchableOpacity
                  style={[
                    styles.saveBtn,
                    { marginLeft: 8, paddingHorizontal: 16 },
                  ]}
                  onPress={addDoc}
                >
                  <Text style={styles.saveBtnText}>Add</Text>
                </TouchableOpacity>
              </View>

              {/* List default documents */}
              {initialDocs.map((d) => (
                <TouchableOpacity
                  key={d}
                  onPress={() => toggleChecked(d)}
                  style={styles.checkRow}
                >
                  <Text style={styles.checkbox}>{checked[d] ? "☑" : "☐"}</Text>
                  <Text style={styles.checkText}>{d}</Text>
                </TouchableOpacity>
              ))}

              {/* List user-added documents with remove button */}
              {userDocs.map((d) => (
                <View key={d} style={styles.checkRow}>
                  <Text style={styles.checkbox}>{checked[d] ? "☑" : "☐"}</Text>
                  <Text style={styles.checkText}>{d}</Text>
                  <TouchableOpacity
                    onPress={() => removeDoc(d)}
                    style={{ marginLeft: 8 }}
                  >
                    <Text style={{ color: "#EF946C" }}>x</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Contacts Section */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setContactsOpen((v) => !v)}
          >
            <Text style={styles.sectionTitle}>Important Contacts</Text>
            <Text style={styles.chevron}>{docsOpen ? "▾" : "▸"}</Text>
          </TouchableOpacity>
          {contactsOpen && (
            <View style={styles.sectionBody}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => setShowContactForm(!showContactForm)}
              >
                <Text style={styles.addButtonText}>+ Add Contact</Text>
              </TouchableOpacity>

              {showContactForm && (
                <View style={styles.form}>
                  <TextInput
                    placeholder="Name"
                    value={newName}
                    onChangeText={setNewName}
                    placeholderTextColor="#999999"
                    style={styles.input}
                  />
                  <TextInput
                    placeholder="Phone Number"
                    value={newPhone}
                    onChangeText={setNewPhone}
                    keyboardType="phone-pad"
                    placeholderTextColor="#999999"
                    style={styles.input}
                  />
                  <TouchableOpacity style={styles.saveBtn} onPress={addContact}>
                    <Text style={styles.saveBtnText}>Save</Text>
                  </TouchableOpacity>
                </View>
              )}

              {contacts.length == 0 ? (
                <Text style={styles.emptyText}>No contacts yet</Text>
              ) : (
                contacts.map((c) => (
                  <View key={c.id} style={styles.contactRow}>
                    <View>
                      <Text style={styles.contactName}>{c.name}</Text>
                      <Text style={styles.contactPhone}>{c.phone}</Text>
                    </View>
                    <View style={styles.contactActions}>
                      <TouchableOpacity style={styles.iconBtn}>
                        <Text>☎️</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconBtn}>
                        <Text>💬</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}

          {/* Transportation Section */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setTransportOpen((v) => !v)}
          >
            <Text style={styles.sectionTitle}>Transportation</Text>
            <Text style={styles.chevron}>{docsOpen ? "▾" : "▸"}</Text>
          </TouchableOpacity>
          {transportOpen && (
            <View style={styles.sectionBody}>
              <TextInput
                placeholder="Enter your city or area"
                value={area}
                onChangeText={setArea}
                placeholderTextColor="#999999"
                style={styles.input}
    
              />
              {area ? (
                <View style={{ marginTop: 8 }}>
                  <Text style={styles.subHeading}>
                    Sample transit for "{area}":
                  </Text>
                  <Text style={styles.transitItem}>
                    • City Bus Line A: Routes 1, 2, 3
                  </Text>
                  <Text style={styles.transitItem}>
                    • Shuttle Service X: Weekdays 6am–10pm
                  </Text>
                  <Text style={{ color: "#999999", fontSize: 12, marginTop: 8 }}>
                    Replace with real transit data from the researched local
                    systems
                  </Text>
                </View>
              ) : null}
            </View>
          )}

          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setMoneyOpen((v) => !v)}
          >
            <Text style={styles.sectionTitle}>Money Saved</Text>
            <Text style={styles.chevron}>{moneyOpen ? "▾" : "▸"}</Text>
          </TouchableOpacity>
          {moneyOpen && (
            <View style={styles.sectionBody}>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${progress * 100}%` },
                  ]}
                />
              </View>
              <Text
                style={styles.progressText}
              >{`${(progress * 100).toFixed(0)}% of $${SAVINGS_GOAL}`}</Text>

              <Text style={{ color: "#EF946C", marginBottom: 6 }}>
                Total Saved: ${moneySaved.toFixed(2)}
              </Text>
              <TextInput
                placeholder="Add amount"
                value={newAmount}
                onChangeText={setNewAmount}
                keyboardType="numeric"
                placeholderTextColor="#999999"
                style={styles.input}
              />
              <TouchableOpacity style={styles.saveBtn} onPress={addMoney}>
                <Text style={styles.saveBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Packing Checklist Section */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setPackingOpen((v) => !v)}
          >
            <Text style={styles.sectionTitle}>Packing Checklist</Text>
            <Text style={styles.chevron}>{packingOpen ? "▾" : "▸"}</Text>
          </TouchableOpacity>
          {packingOpen && (
            <View style={styles.sectionBody}>
              {/* Add new item */}
              <View style={{ flexDirection: "row", marginBottom: 8 }}>
                <TextInput
                  placeholder="New item"
                  value={newPackingItem}
                  onChangeText={setNewPackingItem}
                  placeholderTextColor="#999"
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                />
                <TouchableOpacity
                  style={[
                    styles.saveBtn,
                    { marginLeft: 8, paddingHorizontal: 16 },
                  ]}
                  onPress={addPackingItem}
                >
                  <Text style={styles.saveBtnText}>Add</Text>
                </TouchableOpacity>
              </View>

              {/* List of items */}
              {packingItems.length === 0 ? (
                <Text style={styles.emptyText}>No items added yet</Text>
              ) : (
                packingItems.map((item) => (
                  <View key={item} style={styles.checkRow}>
                    <Text style={styles.checkText}>{item}</Text>
                    <TouchableOpacity
                      onPress={() => removePackingItem(item)}
                      style={{ marginLeft: 8 }}
                    >
                      <Text style={{ color: "#EF946C" }}>x</Text>
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          )}
        </ScrollView>

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
    marginBottom: 10,
    marginTop: 40,
    color: "#EDF6F9",
  },
  content: { padding: 16 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#999999",
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "#EDF6F9" },
  chevron: { fontSize: 18, color: "#aaa" },
  sectionBody: { paddingVertical: 8, paddingLeft: 4 },
  placeholder: { color: "#aaa", fontSize: 14 },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  checkbox: { fontSize: 18, width: 28 },
  checkText: { fontSize: 15, color: "#EDF6F9" },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#19233E",
    alignSelf: "flex-start",
    borderRadius: 6,
    marginBottom: 8,
  },
  addButtonText: { fontWeight: "600", color: "#7884AE" },
  form: { marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    color: "#EDF6F9",
    backgroundColor: "#1a1a1a",
  },
  saveBtn: {
    backgroundColor: "#7884AE",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  saveBtnText: { color: "#EDF6F9", fontWeight: "600" },
  emptyText: { color: "#999999", fontSize: 14 },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#19233E",
  },
  contactName: { fontWeight: "600", color: "#EDF6F9" },
  contactPhone: { color: "#999999", fontSize: 12 },
  contactActions: { flexDirection: "row", gap: 8 },
  iconBtn: { padding: 6 },
  subHeading: { color: "#7884AE", fontWeight: "600", marginBottom: 6 },
  transitItem: { color: "#EDF6F9", fontSize: 14, marginBottom: 4 },
  progressBarContainer: {
    height: 20,
    backgroundColor: "#19233E",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#7884AE",
    borderRadius: 10,
  },
  progressText: { color: "#EDF6F9", fontSize: 12, fontWeight: "600" },
  subtitle: {
    color: "#999999",
    fontSize: 14,
    marginBottom: 12,
    alignSelf: "center",
  },
});