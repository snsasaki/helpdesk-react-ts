export type ContactStatus = "pending" | "in_progress" | "completed";

export type Contact = {
  id: number;
  title: string;
  detail: string;
  status: ContactStatus;
};

export type ContactFormData = {
  title: string;
  detail: string;
};
