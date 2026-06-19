import { useState } from "react";
import ContactForm from "./components/ContactForm";
import type { Contact } from "./types/Contact";
import ContactItem from "./components/ContactItem";

function App() {
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
      <h1>ヘルプデスク</h1>
      <ContactForm onAdd={handleAdd} />
      <ul>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </ul>
    </>
  );
}

export default App;
