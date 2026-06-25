import { useForm } from "react-hook-form";
import axios from "axios";
import { authApi } from "../api/auth";
import type { LoginInput, User } from "../types/auth";

type LaravelValidationError = {
  errors: Record<string, string[]>;
};

type LoginFormProps = {
  onLoggedIn: (user: User, token: string) => void;
};

export function LoginForm({ onLoggedIn }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>();

  const onSubmit = async (data: LoginInput) => {
    try {
      const { user, token } = await authApi.login(data);
      onLoggedIn(user, token);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        const body = e.response.data as LaravelValidationError;
        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof LoginInput, {
            type: "server",
            message: messages[0],
          });
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>ログイン</h2>

      <div>
        <label>メールアドレス</label>
        <input
          type="email"
          {...register("email", {
            required: "メールアドレスを入力してください",
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>パスワード</label>
        <input
          type="password"
          {...register("password", {
            required: "パスワードを入力してください",
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "ログイン中..." : "ログイン"}
      </button>
    </form>
  );
}
