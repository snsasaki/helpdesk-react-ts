import { useForm } from "react-hook-form";
import axios from "axios";
import type { LoginInput, User } from "../types/auth";
import {
  Alert,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

type LaravelValidationError = {
  errors: Record<string, string[]>;
};

type LoginFormProps = {
  onLogin: (input: LoginInput) => Promise<User>;
};

export function LoginForm({ onLogin }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await onLogin(data);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        const body = e.response.data as LaravelValidationError;
        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof LoginInput, {
            type: "server",
            message: messages[0],
          });
        });

        return;
      }

      setError("root", {
        type: "server",
        message:
          "ログインに失敗しました。メールアドレスとパスワードを確認してください。",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        bgcolor: "background.default",
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4" component="h1">
              ログイン
            </Typography>
          </Stack>

          {errors.root?.message && (
            <Alert severity="error">{errors.root.message}</Alert>
          )}

          <TextField
            label="メールアドレス"
            type="email"
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register("email", {
              required: "メールアドレスを入力してください",
            })}
          />

          <TextField
            label="パスワード"
            type="password"
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register("password", {
              required: "パスワードを入力してください",
            })}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "ログイン中..." : "ログイン"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
