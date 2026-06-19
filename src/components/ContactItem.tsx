import type { Contact } from "../types/Contact";

type Props = {
  contact: Contact;
  onEdit: (id: number) => void;
};

function ContactItem({ contact, onEdit }: Props) {
  const statusLabels = {
    pending: "未対応",
    in_progress: "対応中",
    completed: "完了",
  };
  return (
    <li>
      <p>{contact.title}</p>
      <p>{contact.detail}</p>
      <p>{statusLabels[contact.status]}</p>
      <button type="button" onClick={() => onEdit(contact.id)}>
        編集
      </button>
    </li>
  );
}

export default ContactItem;
