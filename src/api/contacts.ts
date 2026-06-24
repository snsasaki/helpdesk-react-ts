import { api } from "../lib/api";
import type { Contact, ContactFormData, ContactStatus } from "../types/Contact";

export type ContactResponse = {
  id: number;
  title: string;
  detail: string;
  status: ContactStatus;
  created_at: string;
  updated_at: string;
};

// Reactが扱いやすいように変換する関数
const toContact = (contact: ContactResponse): Contact => ({
  id: contact.id,
  title: contact.title,
  detail: contact.detail,
  status: contact.status,
  createdAt: contact.created_at,
});

export const contactApi = {
  getAll: async (status?: string): Promise<Contact[]> => {
    const params = status && status !== "all" ? { status } : {};
    const response = await api.get<ContactResponse[]>("/api/contacts", {
      params,
    });
    return response.data.map(toContact);
  },

  create: async (input: ContactFormData): Promise<Contact> => {
    const response = await api.post<ContactResponse>("/api/contacts", input);
    return toContact(response.data);
  },

  updateStatus: async (id: number, status: ContactStatus): Promise<Contact> => {
    const response = await api.put<Contact>(`/api/contacts/${id}`, { status });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/contacts/${id}`);
  },
};
