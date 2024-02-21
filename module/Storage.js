import * as SecureStore from "expo-secure-store";
import { Platform, Settings } from "react-native";

class Storage {
  static #isIos = Platform.OS === "ios";

  static async #setSecureStore(contacts) {
    return SecureStore.setItemAsync("contacts", JSON.stringify(contacts));
  }

  static async #setSettings(contacts) {
    return Settings.set({ contacts: JSON.stringify(contacts) });
  }

  async setContacts(contacts) {
    Storage.#isIos
      ? await Storage.#setSettings(contacts)
      : await Storage.#setSecureStore(contacts);
    return this.getContacts();
  }

  static async #getSecureStore() {
    const contacts = await SecureStore.getItemAsync("contacts");
    return contacts ? JSON.parse(contacts) : [];
  }

  static async #getSettings() {
    const contacts = Settings.get("contacts");
    return contacts ? JSON.parse(contacts) : [];
  }

  async getContacts() {
    return Storage.#isIos ? Storage.#getSettings() : Storage.#getSecureStore();
  }
}

export default new Storage();
