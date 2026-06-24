import { useState } from "react";

type SnackbarSeverity = "success" | "error" | "info" | "warning";

export function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SnackbarSeverity>("success");

  const showSnackbar = (
    nextMessage: string,
    nextSeverity: SnackbarSeverity = "success",
  ) => {
    setMessage(nextMessage);
    setSeverity(nextSeverity);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return {
    snackbar: {
      open,
      message,
      severity,
    },
    showSnackbar,
    closeSnackbar,
  };
}
