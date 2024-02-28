import ExpoSettingsModule from "./ExpoSettingsModule";

export interface Contact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  type: "Work" | "Personal" | "Random";
  id: string;
}

export function getContacts(): Contact[] {
  const response = ExpoSettingsModule.getContacts();
  return JSON.parse(response);
}

export function setContacts(contacts: Contact[]): void {
  return ExpoSettingsModule.setContacts(JSON.stringify(contacts));
}
