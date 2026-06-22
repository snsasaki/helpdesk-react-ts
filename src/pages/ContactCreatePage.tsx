import ContactForm from "../components/ContactForm";
import type { ContactFormData } from "../types/Contact";
import { Typography } from "@mui/material";

type Props = {
  onAdd: (contact: ContactFormData) => void;
};

function ContactCreatePage({ onAdd }: Props) {
  return (
    <>
      <Typography variant="h4" component="h1">
        お問い合わせフォーム
      </Typography>
      <ContactForm onAdd={onAdd} />
    </>
  );
}

export default ContactCreatePage;
