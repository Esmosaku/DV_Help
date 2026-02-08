import React, { createContext, useState, useContext } from "react";

type Contact = { name: string; phone: string ; email?: string };

const EmergencyContext = createContext<{
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  removeContact: (phone: string) => void;
}>({ contacts: [], addContact: () => {}, removeContact: () => {} });

export const EmergencyProvider = ({ children }: any) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (contact: Contact) => setContacts([...contacts, contact]);
  const removeContact = (phone: string) =>
    setContacts(contacts.filter(c => c.phone !== phone));

  return (
    <EmergencyContext.Provider value={{ contacts, addContact, removeContact }}>
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => useContext(EmergencyContext);
