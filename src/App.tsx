import { useEffect, useState } from "react";
import type {
  Contact,
  // ContactFormData,
  // ContactStatus,
  // SortOrder,
} from "./types/Contact";

// import ContactCreatePage from "./pages/ContactCreatePage";
// import ContactListPage from "./pages/ContactListPage";
// import ContactDetailPage from "./pages/ContactDetailPage";

import {
  // Button,
  Container,
  Paper,
  Stack,
} from "@mui/material";

import { contactApi } from "./api/contacts";

// ページ切り替え用types
// type Page = "list" | "detail" | "create";

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    contactApi.getAll().then(setContacts);
  }, []);
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          <div>
            <h1>接続確認</h1>
            <p>取得件数: {contacts.length}</p>
          </div>
          {/* <Button
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
          )} */}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
