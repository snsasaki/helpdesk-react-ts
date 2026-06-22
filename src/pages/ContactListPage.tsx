import ContactItem from "../components/ContactItem";
import type { Contact, ContactStatus } from "../types/Contact";

type Props = {
  contacts: Contact[];
  statusFilter: ContactStatus | "all";
  onFilterChange: (status: ContactStatus | "all") => void;
  onEdit: (id: number) => void;
};

function ContactListPage({
  contacts,
  statusFilter,
  onFilterChange,
  onEdit,
}: Props) {
  return (
    <>
      <h1>一覧画面ページです</h1>
      <select
        value={statusFilter}
        onChange={(e) =>
          onFilterChange(e.target.value as ContactStatus | "all")
        }
      >
        <option value="all">すべて</option>
        <option value="pending">未対応</option>
        <option value="in_progress">対応中</option>
        <option value="completed">完了</option>
      </select>
      <ul>
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} onEdit={onEdit} />
        ))}
      </ul>
    </>
  );
}

export default ContactListPage;
