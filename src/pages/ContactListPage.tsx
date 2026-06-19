import ContactItem from "../components/ContactItem";
import type { Contact } from "../types/Contact";

type Props = {
  contacts: Contact[];
};

function ContactListPage({ contacts }: Props) {
  return (
    <>
      <h1>一覧画面ページです</h1>
      <ul>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} />
        ))}
      </ul>
    </>
  );
}

export default ContactListPage;
