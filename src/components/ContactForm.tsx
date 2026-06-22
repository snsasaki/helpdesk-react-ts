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
  const { register, handleSubmit, reset } = useForm<FormData>({
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
            {...register("title")}
            placeholder="お問い合わせのタイトルを入力してください"
          />
        </li>

        <li>
          <input
            {...register("detail")}
            placeholder="お問い合わせ内容を入力してください"
          />
        </li>
      </ul>

      <button type="submit">追加</button>
    </form>
  );
}

export default ContactForm;
