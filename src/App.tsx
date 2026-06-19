import { useState } from "react";
import type { Contact } from "./types/Contact";
import ContactCreatePage from "./pages/ContactCreatePage";
import ContactListPage from "./pages/ContactListPage";
import ContactDetailPage from "./pages/ContactDetailPage";

// ページ切り替え用types
type Page = "list" | "detail" | "create";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("list");
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

  const handleAdd = (contact: Omit<Contact, "id">) => {
    const newContact: Contact = {
      id: Date.now(),
      title: contact.title,
      detail: contact.detail,
      status: "pending",
    };
    setContacts((prev) => [...prev, newContact]);
  };

  return (
    <>
      <button onClick={() => setCurrentPage("create")}>
        お問い合わせ登録ページへ遷移
      </button>

      <button onClick={() => setCurrentPage("list")}>
        お問い合わせ一覧ページへ遷移
      </button>

      <button onClick={() => setCurrentPage("detail")}>
        お問い合わせ詳細ページへ遷移
      </button>

      {currentPage === "list" && <ContactListPage contacts={contacts} />}

      {currentPage === "create" && <ContactCreatePage onAdd={handleAdd} />}

      {currentPage === "detail" && <ContactDetailPage />}
    </>
  );
}

export default App;
