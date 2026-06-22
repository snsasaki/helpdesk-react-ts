export type ContactStatus = "pending" | "in_progress" | "completed";

export type SortOrder = "newest" | "oldest";

export type Contact = {
  id: number;
  title: string;
  detail: string;
  status: ContactStatus;
  createdAt: string;
};

export type ContactFormData = {
  title: string;
  detail: string;
};
