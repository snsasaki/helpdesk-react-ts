import type { ContactStatus } from "../types/Contact";
import { useForm } from "react-hook-form";

type FormData = {
  title: string;
  detail: string;
  status: ContactStatus;
};

type Props = {
  onAdd: (contact: FormData) => void;
};

function ContactForm({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      detail: "",
      status: "pending",
    },
  });

  const onSubmit = (data: FormData) => {
    onAdd(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        <li>
          <input
            {...register("title", {
              required: "タイトルの入力は必須です",
              minLength: {
                value: 3,
                message: "タイトルは3文字以上で入力してください",
              },
            })}
            placeholder="お問い合わせのタイトルを入力してください"
          />
          {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
        </li>

        <li>
          <input
            {...register("detail", {
              maxLength: {
                value: 50,
                message: "詳細は50文字以内で入力してください",
              },
            })}
            placeholder="お問い合わせ内容を入力してください"
          />
          {errors.detail && (
            <p style={{ color: "red" }}>{errors.detail.message}</p>
          )}
        </li>
      </ul>

      <button type="submit">追加</button>
    </form>
  );
}

export default ContactForm;
