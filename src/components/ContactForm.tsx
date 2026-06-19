import { useState } from "react";
import type { Contact } from "../types/Contact";

type Props = {
  // contact: Contact;
  onAdd: (contact: Omit<Contact, "id">) => void;
};

function ContactForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail(e.target.value);
  };
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({
      title,
      detail,
      status: "pending",
    });
    setTitle("");
    setDetail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        <li>
          <input
            value={title}
            onChange={handleTitleChange}
            placeholder="お問い合わせのタイトルを入力してください"
          />
        </li>
        <li>
          <input
            value={detail}
            onChange={handleDetailChange}
            placeholder="お問い合わせ内容を入力してください"
          />
        </li>
      </ul>
      <button type="submit">追加</button>
    </form>
  );
}

export default ContactForm;
