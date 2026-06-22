import { useState } from "react";
import type {
  Contact,
  ContactFormData,
  ContactStatus,
  SortOrder,
} from "./types/Contact";
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
      createdAt: "2026-06-20T10:00:00.000Z",
    },
    {
      id: 2,
      title: "画面が表示されない",
      detail: "トップページが真っ白です",
      status: "in_progress",
      createdAt: "2026-06-21T10:00:00.000Z",
    },
    {
      id: 3,
      title: "問い合わせ完了",
      detail: "解決済みです",
      status: "completed",
      createdAt: "2026-06-23T10:00:00.000Z",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState<ContactStatus | "all">(
    "all",
  );

  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");

  const filteredContacts =
    statusFilter === "all"
      ? contacts
      : contacts.filter((contact) => contact.status === statusFilter);

  const sortedContacts = [...filteredContacts].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();

    return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
  });

  const handleAdd = (contact: ContactFormData) => {
    const newContact: Contact = {
      id: Date.now(),
      title: contact.title,
      detail: contact.detail,
      status: "pending",
      createdAt: new Date().toISOString(),
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

  // お問い合わせ削除
  const handleDelete = (id: number) => {
    setContacts((prev) => prev.filter((contact) => contact.id != id));

    if (selectedContactId === id) {
      setSelectedContactId(null);
      setCurrentPage("list");
    }
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
              contacts={sortedContacts}
              statusFilter={statusFilter}
              sortOrder={sortOrder}
              onFilterChange={setStatusFilter}
              onSortOrderChange={setSortOrder}
              onEdit={handleSelectContact}
              onDelete={handleDelete}
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
