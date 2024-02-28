import { randomUUID } from "expo-crypto";
import * as Settings from "expo-settings";
import PropTypes from "prop-types";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Contact, DraftContact } from "../types";

interface ContactsContextType {
  contacts: Contact[] | null;
  createContact: (contact: DraftContact) => Promise<void>;
  updateContact: (contactId: string, updatedContact: Contact) => Promise<void>;
  deleteContact: (contactId: string) => Promise<void>;
  getContact: (contactId: string) => Promise<Contact | undefined>;
}

export const ContactsContext = createContext<ContactsContextType>({
  contacts: [],
  createContact: (_contact: DraftContact) => Promise.resolve(),
  updateContact: (_contactId: string, _updatedContact: Contact) =>
    Promise.resolve(),
  deleteContact: (_contactId: string) => Promise.resolve(),
  getContact: (_contactId: string) => Promise.resolve(undefined),
});

export const ContactsProvider = ({ children }: PropsWithChildren) => {
  const [contactsCache, setContactsCache] = useState<Contact[] | null>(null);

  const getContacts = useCallback(async (): Promise<Contact[]> => {
    if (contactsCache !== null) {
      return contactsCache;
    }
    try {
      const contacts = await Settings.getContacts();
      setContactsCache(contacts);
      return contacts;
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      return [];
    }
  }, [contactsCache]);

  const createContact = useCallback(
    async (contact: DraftContact) => {
      try {
        const id = await randomUUID();
        const contacts = await getContacts();
        await Settings.setContacts([...contacts, { ...contact, id }]);
        setContactsCache([...contacts, { ...contact, id }]);
      } catch (error) {
        console.error("Failed to create contact:", error);
      }
    },
    [getContacts],
  );

  const updateContact = useCallback(
    async (contactId: string, updatedContact: Contact) => {
      try {
        const contacts = await getContacts();
        const index = contacts.findIndex((contact) => contact.id === contactId);
        if (index !== -1) {
          const updatedContacts = [...contacts];
          updatedContacts[index] = updatedContact;
          await Settings.setContacts(updatedContacts);
          setContactsCache(updatedContacts);
        }
      } catch (error) {
        console.error("Failed to update contact:", error);
      }
    },
    [getContacts],
  );

  const deleteContact = useCallback(
    async (contactId: string) => {
      try {
        const contacts = await getContacts();
        const newContacts = contacts.filter(
          (contact) => contact.id !== contactId,
        );
        await Settings.setContacts(newContacts);
        setContactsCache(newContacts);
      } catch (error) {
        console.error("Failed to delete contact:", error);
      }
    },
    [getContacts],
  );

  const getContact = useCallback(
    async (contactId: string) => {
      try {
        const contacts = await getContacts();
        return contacts.find((contact) => contact.id === contactId);
      } catch (error) {
        console.error("Failed to get contact:", error);
      }
    },
    [getContacts],
  );

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts: contactsCache,
        createContact,
        updateContact,
        deleteContact,
        getContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

ContactsProvider.propTypes = {
  children: PropTypes.any,
};
