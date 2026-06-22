import ContactItem from "../components/ContactItem";
import type { Contact, ContactStatus } from "../types/Contact";

import { FormControl, MenuItem, Select, Typography } from "@mui/material";

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
      <Typography variant="h4" component="h1">
        お問い合わせ一覧
      </Typography>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <Select
          value={statusFilter}
          onChange={(e) =>
            onFilterChange(e.target.value as ContactStatus | "all")
          }
        >
          <MenuItem value="all">すべて</MenuItem>
          <MenuItem value="pending">未対応</MenuItem>
          <MenuItem value="in_progress">対応中</MenuItem>
          <MenuItem value="completed">完了</MenuItem>
        </Select>
        <ul>
          {contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} onEdit={onEdit} />
          ))}
        </ul>
      </FormControl>
    </>
  );
}

export default ContactListPage;
