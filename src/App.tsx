import { useState } from "react";
import type { Contact, ContactFormData, ContactStatus } from "./types/Contact";
import ContactCreatePage from "./pages/ContactCreatePage";
import ContactListPage from "./pages/ContactListPage";
import ContactDetailPage from "./pages/ContactDetailPage";

import { Button, Container, Paper, Stack } from "@mui/material";

// ページ切り替え用types
type Page = "list" | "detail" | "create";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("list");
  const [selectedContactId, setSelectedContactId] = useState<number | null>(
    null,
  );
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      title: "ログインできない",
      detail: "パスワードを忘れました",
      status: "pending",
    },
    {
      id: 2,
      title: "画面が表示されない",
      detail: "トップページが真っ白です",
      status: "in_progress",
    },
    {
      id: 3,
      title: "問い合わせ完了",
      detail: "解決済みです",
      status: "completed",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState<ContactStatus | "all">(
    "all",
  );

  const filteredContacts =
    statusFilter === "all"
      ? contacts
      : contacts.filter((contact) => contact.status === statusFilter);

  const handleAdd = (contact: ContactFormData) => {
    const newContact: Contact = {
      id: Date.now(),
      title: contact.title,
      detail: contact.detail,
      status: "pending",
    };
    setContacts((prev) => [...prev, newContact]);
  };

  // id情報を編集ボタンに持たせStateに保存して、ページStateも変更してページ遷移（風）
  const handleSelectContact = (id: number) => {
    setSelectedContactId(id);
    setCurrentPage("detail");
  };

  const handleStatusChange = (id: number, status: Contact["status"]) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id ? { ...contact, status } : contact,
      ),
    );
  };

  // 編集するContactのidを識別
  const selectedContact =
    contacts.find((c) => c.id === selectedContactId) ?? null;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <Button
            variant={currentPage === "list" ? "contained" : "outlined"}
            onClick={() => setCurrentPage("list")}
          >
            お問い合わせ一覧
          </Button>
          <Button
            variant={currentPage === "create" ? "contained" : "outlined"}
            onClick={() => setCurrentPage("create")}
          >
            お問い合わせフォーム
          </Button>

          {currentPage === "list" && (
            <ContactListPage
              contacts={filteredContacts}
              statusFilter={statusFilter}
              onFilterChange={setStatusFilter}
              onEdit={handleSelectContact}
            />
          )}

          {currentPage === "create" && <ContactCreatePage onAdd={handleAdd} />}

          {currentPage === "detail" && selectedContact && (
            <ContactDetailPage
              contact={selectedContact}
              onBack={() => setCurrentPage("list")}
              onStatusChange={handleStatusChange}
            />
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
