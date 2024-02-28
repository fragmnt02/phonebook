export interface DraftContact {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  type: "Work" | "Personal" | "Random";
}

export interface Contact extends DraftContact {
  id: string;
}
