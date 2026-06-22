import type { Contact } from "../types/Contact";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  contact: Contact;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

const statusConfig = {
  pending: {
    label: "未対応",
    color: "warning",
  },
  in_progress: {
    label: "対応中",
    color: "info",
  },
  completed: {
    label: "完了",
    color: "success",
  },
} as const;

function ContactItem({ contact, onEdit, onDelete }: Props) {
  const status = statusConfig[contact.status];

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component="h2">
              {contact.title}
            </Typography>

            <Chip label={status.label} color={status.color} size="small" />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {contact.detail}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => onEdit(contact.id)}
        >
          詳細を見る
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => onDelete(contact.id)}
        >
          削除
        </Button>
      </CardActions>
    </Card>
  );
}

export default ContactItem;
