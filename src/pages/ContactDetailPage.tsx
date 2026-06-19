import type { Contact } from "../types/Contact";

type Props = {
  contact: Contact;
  onBack: () => void;
};

function ContactDetailPage({ contact }: Props) {
  const statusLabels = {
    pending: "未対応",
    in_progress: "対応中",
    completed: "完了",
  };
  return (
    <>
      {/* TODO: 情報がデフォルト入力されているフォームが表示される */}
      <h1>詳細ページです</h1>
      <p>{contact.title}</p>
      <p>{contact.detail}</p>
      <p>{statusLabels[contact.status]}</p>
    </>
  );
}

export default ContactDetailPage;
