import Storage from "../module/Storage";
import { randomUUID } from "expo-crypto";

export const useContacts = () => {
  const getContacts = async () => {
    return Storage.getContacts();
  };

  const createContact = async (newContact) => {
    const contacts = await getContacts();
    const id = await randomUUID();
    await Storage.setContacts([...contacts, { ...newContact, id }]);
  };

  const updateContact = async (contactId, updatedContact) => {
    const contacts = await getContacts();
    await Storage.setContacts(
      contacts.map((contact) =>
        contact.id === contactId ? updatedContact : contact
      )
    );
  };

  const deleteContact = async (contactId) => {
    const contacts = await getContacts();
    await Storage.setContacts(
      contacts.filter((contact) => contact.id !== contactId)
    );
  };

  const getContact = async (contactId) => {
    const contacts = await getContacts();
    return contacts.find((contact) => contact.id === contactId);
  };

  return {
    getContacts,
    updateContact,
    createContact,
    deleteContact,
    getContact,
    getContacts,
  };
};