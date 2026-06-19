import type { Contact } from "../types/Contact";

type Props = {
  contact: Contact;
};

function ContactItem({ contact }: Props) {
  return (
    <li>
      <span>{contact.title}</span>
      <span>{contact.detail}</span>
    </li>
  );
}

export default ContactItem;
