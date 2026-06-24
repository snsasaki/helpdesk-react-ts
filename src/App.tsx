import { useEffect, useState } from "react";
import type {
  Contact,
  ContactFormData,
  ContactStatus,
  SortOrder,
} from "./types/Contact";

import ContactCreatePage from "./pages/ContactCreatePage";
import ContactListPage from "./pages/ContactListPage";
// import ContactDetailPage from "./pages/ContactDetailPage";

import { Button, Container, Paper, Stack, Typography } from "@mui/material";

import { contactApi } from "./api/contacts";

// ページ切り替え用types
type Page = "list" | "detail" | "create";

type StatusFilter = ContactStatus | "all";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("list");
  // const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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

  const sortedContacts = [...contacts].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();

    return sortOrder === "newest" ? bTime - aTime : aTime - bTime;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          {/* TODO: 削除予定 */}
          <div>
            <Typography variant="h5" component="p">
              接続確認
            </Typography>
            <Typography color="text.secondary">
              取得件数: {contacts.length}
            </Typography>
          </div>

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
              // TODO: 変更予定
              onEdit={(id) => console.log("detail", id)}
              // TODO: 変更予定
              onDelete={(id) => console.log("delete", id)}
            />
          )}

          {currentPage === "create" && <ContactCreatePage onAdd={handleAdd} />}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
