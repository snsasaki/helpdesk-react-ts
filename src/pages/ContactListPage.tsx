import ContactItem from "../components/ContactItem";
import type { Contact } from "../types/Contact";

type Props = {
  contacts: Contact[];
  onEdit: (id: number) => void;
};

function ContactListPage({ contacts, onEdit }: Props) {
  return (
    <>
      <h1>一覧画面ページです</h1>
      <ul>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} onEdit={onEdit} />
        ))}
      </ul>
    </>
  );
}

export default ContactListPage;
