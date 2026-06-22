import {
  Button,
  CardActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { Contact, ContactStatus } from "../types/Contact";

type Props = {
  contact: Contact;
  onBack: () => void;
  onStatusChange: (id: number, status: ContactStatus) => void;
};

function ContactDetailPage({ contact, onBack, onStatusChange }: Props) {
  const statusOptions: {
    value: ContactStatus;
    label: string;
  }[] = [
    { value: "pending", label: "未対応" },
    { value: "in_progress", label: "対応中" },
    { value: "completed", label: "完了" },
  ];

  const handleStatusChange = (event: SelectChangeEvent<ContactStatus>) => {
    onStatusChange(contact.id, event.target.value as ContactStatus);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1">
        お問い合わせ詳細
      </Typography>

      <Typography>{contact.title}</Typography>

      <Typography>{contact.detail}</Typography>

      <FormControl size="small">
        <InputLabel id="status-label">完了状態</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          value={contact.status}
          label="完了状態"
          onChange={handleStatusChange}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CardActions>
        <Button variant="outlined" onClick={onBack}>
          戻る
        </Button>
      </CardActions>
    </Stack>
  );
}

export default ContactDetailPage;
