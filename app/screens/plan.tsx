import {View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput} from "react-native"
import React, {useState} from "react"
import { useNavigation } from "@react-navigation/native"

export default function PlanScreen(){
    const navigation: any = useNavigation()
    const [docsOpen, setDocsOpen] = useState(true)
    const [contactsOpen, setContactsOpen] = useState(false)
    const [transportOpen, setTransportOpen] = useState(false)
    const initialDocs = ["ID/ Driver's License", "Birth Certificate", "Medical Records", "Insurance Cards"]
    const [checked, setChecked] = useState<Record<string, boolean>>({})
    const toggleChecked = (item: string) =>{
        setChecked(prev => ({...prev, [item]: !prev[item]}))
    }
    type Contact = { id: string; name: string; phone: string }
    const [contacts, setContacts] = useState<Contact[]>([])
    const [showContactForm, setShowContactForm] = useState(false)
    const [newName, setNewName] = useState("")
    const [newPhone, setNewPhone] = useState("")
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

    return(
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>My Plan</Text>
                <View style={{width: 32}} />
            </View>
            
            {/* Content */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text>See details about what makes a successful plan</Text>
                {/* Documents Section */}
                <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => setDocsOpen(v => !v)}
                >
                    <Text style={styles.sectionTitle}>Important Documents</Text>
                    <Text style={styles.chevron}>{docsOpen ? "▾": "▸"}</Text>
                </TouchableOpacity>
                {docsOpen && (
                    <View style={styles.sectionBody}>
                        {initialDocs.map(d => (
                            <TouchableOpacity
                                key={d}
                                onPress={() => toggleChecked(d)}
                                style={styles.checkRow}
                            >
                                <Text style={styles.checkbox}>{checked[d] ? "☑" : "☐"}</Text>
                                <Text style={styles.checkText}>{d}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {/* Contacts Section */}
                <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => setContactsOpen(v => !v)}
                >
                    <Text style={styles.sectionTitle}>Important Contacts</Text>
                    <Text style={styles.chevron}>{docsOpen ? "▾": "▸"}</Text>
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
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Phone Number"
                                    value={newPhone}
                                    onChangeText={setNewPhone}
                                    keyboardType="phone-pad"
                                    placeholderTextColor="#999"
                                    style={styles.input}
                                />
                                <TouchableOpacity style={styles.saveBtn} onPress={addContact}>
                                    <Text style={styles.saveBtnText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {contacts.length == 0 ? (
                            <Text style={styles.emptyText}>No contacts yet</Text>
                        ): (
                            contacts.map(c => (
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
                    onPress={() => setTransportOpen(v => !v)}
                >
                    <Text style={styles.sectionTitle}>Transportation</Text>
                    <Text style={styles.chevron}>{docsOpen ? "▾": "▸"}</Text>
                </TouchableOpacity>
                {transportOpen && (
                    <View style={styles.sectionBody}>
                        <TextInput
                            placeholder="Enter your city or area"
                            value={area}
                            onChangeText={setArea}
                            placeholderTextColor="#999"
                            style={styles.input}
                        />
                        {area ? (
                            <View style={{marginTop: 8}}>
                                <Text style={styles.subheading}>Sample transit for "{area}":</Text>
                                <Text styles={styles.transmitItem}>• City Bus Line A: Routes 1, 2, 3</Text>
                                <Text styles={styles.transmitItem}>• Shuttle Service X: Weekdays 6am–10pm</Text>
                                <Text style={{color: "#999", fontSize: 12, marginTop: 8}}>
                                    Replace with real transit data from the researched local systems
                                </Text>
                            </View>
                        ): null}
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: "#19233E"},
    header: {
        height: 56,
        paddingHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#333"
    },
    backArrow: {fontSize: 30, color: "#fff"},
    title: {fontSize: 30, fontWeight: "600", color: "#fff"},
    content: {padding: 16},
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#333"
    },
    sectionTitle: {fontSize: 16, fontWeight: "600", color: "#fff"},
    chevron: {fontSize: 18, color: "#aaa"},
    sectionBody: {paddingVertical: 8, paddingLeft: 4},
    placeholder: {color: "#aaa", fontSize: 14},
    checkRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8
    },
    checkbox: {fontSize: 18, width: 28},
    checkText: {fontSize: 15, color: "#eee"},
    addButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: "#333",
        alignSelf: "flex-start",
        borderRadius: 6,
        marginBottom: 8
    },
    addButtonText: {fontWeight: "600", color: "#4CAF50"},
    form: {marginBottom: 12},
    input: {
        borderWidth: 1,
        borderColor: "#444",
        borderRadius: 6,
        padding: 10,
        marginBottom: 8,
        color: "#fff",
        backgroundColor: "#1a1a1a"
    },
    saveBtn: {
        backgroundColor: "#4CAF50",
        paddingVertical: 10,
        borderRadius: 6, 
        alignItems: "center"
    },
    saveBtnText: {color: "#fff", fontWeight: "600"},
    emptyText: {color: "#999", fontSize: 14},
    contactRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#333"
    },
    contactName: {fontWeight: "600", color: "#fff"},
    contactPhone: {color: "#999", fontSize: 12},
    contactActions: {flexDirection: "row", gap: 8},
    iconBtn: {padding: 6},
    subHeading: {color: "#4CAF50", fontWeight: "600", marginBottom: 6},
    transitItem: {color: "#eee", fontSize: 14, marginBottom: 4}
})