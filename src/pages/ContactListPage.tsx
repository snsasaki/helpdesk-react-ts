import ContactItem from "../components/ContactItem";
import type { Contact, ContactStatus, SortOrder } from "../types/Contact";

import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

type StatusFilter = ContactStatus | "all";

type Props = {
  contacts: Contact[];
  statusFilter: StatusFilter;
  sortOrder: SortOrder;
  onFilterChange: (status: StatusFilter) => void;
  onSortOrderChange: (sortOrder: SortOrder) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const statusFilterStyles: Record<StatusFilter, { color: string; bg: string }> =
  {
    all: {
      color: "#374151",
      bg: "#f3f4f6",
    },
    pending: {
      color: "#92400e",
      bg: "#fef3c7",
    },
    in_progress: {
      color: "#075985",
      bg: "#e0f2fe",
    },
    completed: {
      color: "#166534",
      bg: "#dcfce7",
    },
  };

function ContactListPage({
  contacts,
  statusFilter,
  sortOrder,
  onFilterChange,
  onSortOrderChange,
  onEdit,
  onDelete,
}: Props) {
  const selectedStyle = statusFilterStyles[statusFilter];

  return (
    <>
      <Typography variant="h4" component="h1">
        お問い合わせ一覧
      </Typography>
      <Stack>
        未完了残り:{" "}
        {contacts.filter((contact) => contact.status !== "completed").length} 件
      </Stack>
      <FormControl size="small" sx={{ minWidth: 180 }}>
        <Select
          value={statusFilter}
          onChange={(e) => onFilterChange(e.target.value as StatusFilter)}
          sx={{
            color: selectedStyle.color,
            backgroundColor: selectedStyle.bg,
            fontWeight: 600,
            mb: 3,
            "& .MuiSelect-icon": {
              color: selectedStyle.color,
            },
          }}
        >
          <MenuItem value="all">すべて</MenuItem>
          <MenuItem value="pending">未対応</MenuItem>
          <MenuItem value="in_progress">対応中</MenuItem>
          <MenuItem value="completed">完了</MenuItem>
        </Select>
        <Select
          value={sortOrder}
          sx={{ mb: 3 }}
          onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
        >
          <MenuItem value="newest">新しい順</MenuItem>
          <MenuItem value="oldest">古い順</MenuItem>
        </Select>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </FormControl>
    </>
  );
}

export default ContactListPage;
