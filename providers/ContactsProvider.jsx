import PropTypes from "prop-types";
import { createContext, useCallback, useEffect, useReducer } from "react";

import Storage from "../module/Storage";
import { randomUUID } from "expo-crypto";

export const ContactsContext = createContext();

const initialState = {
  contacts: null,
  error: null,
};

function contactsReducer(state, action) {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export const ContactsProvider = ({ children }) => {
  const [{ contacts, error }, dispatch] = useReducer(
    contactsReducer,
    initialState
  );

  const setContactsCache = (contacts) => {
    dispatch({ type: "SET_CONTACTS", payload: contacts });
  };

  const setError = (error) => {
    dispatch({ type: "SET_ERROR", payload: error });
  };

  const getContacts = useCallback(async () => {
    if (contacts !== null) {
      return contacts;
    }
    try {
      const contacts = await Storage.getContacts();
      setContactsCache(contacts);
      return contacts;
    } catch (error) {
      setError("Failed to fetch contacts");
      console.error("Failed to fetch contacts:", error);
    }
  }, [contacts]);

  const createContact = useCallback(
    async (contact) => {
      try {
        const id = await randomUUID();
        const contacts = await getContacts();
        await Storage.setContacts([...contacts, { ...contact, id }]);
        setContactsCache([...contacts, { ...contact, id }]);
      } catch (error) {
        console.error("Failed to create contact:", error);
      }
    },
    [getContacts]
  );

  const updateContact = useCallback(
    async (contactId, updatedContact) => {
      try {
        let contacts = await getContacts();
        const index = contacts.findIndex((contact) => contact.id === contactId);
        if (index !== -1) {
          contacts[index] = updatedContact;
          await Storage.setContacts(contacts);
          setContactsCache(contacts);
        }
      } catch (error) {
        console.error("Failed to update contact:", error);
      }
    },
    [getContacts]
  );

  const deleteContact = useCallback(
    async (contactId) => {
      try {
        const contacts = await getContacts();
        const newContacts = contacts.filter(
          (contact) => contact.id !== contactId
        );
        await Storage.setContacts(newContacts);
        setContactsCache(newContacts);
      } catch (error) {
        console.error("Failed to delete contact:", error);
      }
    },
    [getContacts]
  );

  const getContact = useCallback(
    async (contactId) => {
      try {
        const contacts = await getContacts();
        return contacts.find((contact) => contact.id === contactId);
      } catch (error) {
        console.error("Failed to get contact:", error);
      }
    },
    [getContacts]
  );

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        createContact,
        updateContact,
        deleteContact,
        getContact,
        error,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

ContactsProvider.propTypes = {
  children: PropTypes.any,
};
