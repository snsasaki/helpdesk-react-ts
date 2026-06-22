import { Button, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import type { ContactFormData } from "../types/Contact";

type Props = {
  onAdd: (contact: ContactFormData) => void;
};

function ContactForm({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues: {
      title: "",
      detail: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="タイトル"
          placeholder="お問い合わせのタイトルを入力してください"
          fullWidth
          required
          error={Boolean(errors.title)}
          helperText={errors.title?.message}
          {...register("title", {
            required: "タイトルの入力は必須です",
            minLength: {
              value: 3,
              message: "タイトルは3文字以上で入力してください",
            },
          })}
        />

        <TextField
          label="お問い合わせ内容"
          placeholder="お問い合わせ内容を入力してください"
          fullWidth
          multiline
          minRows={4}
          error={Boolean(errors.detail)}
          helperText={errors.detail?.message}
          {...register("detail", {
            maxLength: {
              value: 50,
              message: "詳細は50文字以内で入力してください",
            },
          })}
        />

        {/* TODO: stateをlistに変更  */}
        <Button type="submit" variant="contained">
          追加
        </Button>
      </Stack>
    </form>
  );
}

export default ContactForm;
