import type { Contact } from "../types/Contact";

type Props = {
  contact: Contact;
  onBack: () => void;
  onStatusChange: (id: number, status: Contact["status"]) => void;
};

function ContactDetailPage({ contact, onBack, onStatusChange }: Props) {
  const statusOptions = [
    { value: "pending", label: "未対応" },
    { value: "in_progress", label: "対応中" },
    { value: "completed", label: "完了" },
  ] as const;
  return (
    <>
      {/* TODO: 情報がデフォルト入力されているフォームが表示される */}
      <h1>詳細ページです</h1>
      <p>{contact.title}</p>
      <p>{contact.detail}</p>
      <div>
        <label htmlFor="status">完了状態</label>
        <select
          id="status"
          value={contact.status}
          onChange={(e) =>
            onStatusChange(contact.id, e.target.value as Contact["status"])
          }
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <button onClick={onBack}>戻る</button>
    </>
  );
}

export default ContactDetailPage;
