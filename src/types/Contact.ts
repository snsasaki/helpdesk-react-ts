export type ContactStatus = "pending" | "in_progress" | "completed";

export type SortOrder = "newest" | "oldest";

export const contactStatusLabel: Record<ContactStatus, string> = {
  pending: "未対応",
  in_progress: "対応中",
  completed: "完了",
};

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

export type ContactStatusUpdateInput = {
  status: ContactStatus;
};
