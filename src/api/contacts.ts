import { api } from "../lib/api";
import type { Contact, ContactFormData, ContactStatus } from "../types/Contact";

export const ContactApi = {
  getAll: async (status?: string): Promise<Contact[]> => {
    const params = status && status !== "all" ? { status } : {};
    const response = await api.get<Contact[]>("/api/contacts", { params });
    return response.data;
  },

  create: async (input: ContactFormData): Promise<Contact> => {
    const response = await api.post<Contact>("/api/contacts", input);
    return response.data;
  },

  updateStatus: async (id: number, status: ContactStatus): Promise<Contact> => {
    const response = await api.put<Contact>(`/api/contacts/${id}`, { status });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/contacts/${id}`);
  },
};
