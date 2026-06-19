import { useState } from "react";
import ContactForm from "./components/ContactForm";
import type { Contact } from "./types/Contact";
import ContactItem from "./components/ContactItem";

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);

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
