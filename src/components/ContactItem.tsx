import type { Contact } from "../types/Contact";

type Props = {
  contact: Contact;
};

function ContactItem({ contact }: Props) {
  const statusLabels = {
    pending: "未対応",
    in_progress: "対応中",
    completed: "完了",
  };
  return (
    <li>
      {/* TODO: タイトルをクリックすると詳細ページに移行する → 値を変える */}
      <p>{contact.title}</p>
      <p>{contact.detail}</p>
      <p>{statusLabels[contact.status]}</p>
    </li>
  );
}

export default ContactItem;
