import ContactForm from "../components/ContactForm";
import type { ContactFormData } from "../types/Contact";

type Props = {
  onAdd: (contact: ContactFormData) => void;
};

function ContactCreatePage({ onAdd }: Props) {
  return (
    <>
      <h1>登録フォームページです</h1>
      <ContactForm onAdd={onAdd} />
    </>
  );
}

export default ContactCreatePage;
