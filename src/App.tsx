import { useEffect, useState } from "react";
import type {
  Contact,
  ContactFormData,
  ContactStatus,
  SortOrder,
} from "./types/Contact";

import ContactCreatePage from "./pages/ContactCreatePage";
import ContactListPage from "./pages/ContactListPage";
import ContactDetailPage from "./pages/ContactDetailPage";

import {
  Button,
  Container,
  Paper,
  Stack,
  Typography,
  Alert,
  Snackbar,
} from "@mui/material";

import { contactApi } from "./api/contacts";
import { useSnackbar } from "./hooks/useSnackbar";

// ページ切り替え用types
type Page = "list" | "detail" | "create";

type StatusFilter = ContactStatus | "all";

function App() {
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const [currentPage, setCurrentPage] = useState<Page>("list");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const fetchedContacts = await contactApi.getAll(statusFilter);
        setContacts(fetchedContacts);
      } catch (e) {
        setErrorMessage("お問い合わせ情報を取得できませんでした。");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, [statusFilter]);

  const handleAdd = async (input: ContactFormData) => {
    const createContact = await contactApi.create(input);

    setContacts((prevContacts) => [createContact, ...prevContacts]);
    setCurrentPage("list");
  };

  const handleSelectContact = (id: number) => {
    const contact = contacts.find((contact) => contact.id === id);

    if (!contact) {
      return;
    }

    setSelectedContact(contact);
    setCurrentPage("detail");
  };

  const handleStatusChange = async (id: number, status: ContactStatus) => {
    const updatedContact = await contactApi.updateStatus(id, status);

    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? updatedContact : contact,
      ),
    );

    setSelectedContact(updatedContact);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("二言はないな？");

    if (!confirmed) {
      return;
    }
    await contactApi.delete(id);

    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id),
    );

    showSnackbar("削除しました");
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();

    return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
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

          {isLoading && (
            <Typography color="text.secondary">読み込み中...</Typography>
          )}

          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}

          {contacts.length === 0 && (
            <Typography color="text.secondary">
              お問い合わせはありません。
            </Typography>
          )}

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
