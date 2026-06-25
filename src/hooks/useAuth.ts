import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { authApi } from "../api/auth";
import type { User, LoginInput } from "../types/auth";
import { useCookies } from "react-cookie";

const TOKEN_KEY = "auth_token";

export function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies([TOKEN_KEY]);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = cookies[TOKEN_KEY];

    // トークンがCookieから取り出せなかった時 = 未ログイン
    if (!token) {
      setIsLoading(false);
      return;
    }

    // axios のデフォルトヘッダーにトークンをセット
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    authApi
      .me()
      .then(setUser)
      .catch(() => {
        removeCookie(TOKEN_KEY);
        delete api.defaults.headers.common["Authorization"];
      })
      .finally(() => setIsLoading(false));
  }, [cookies, removeCookie]);

  const login = async (input: LoginInput) => {
    const { user, token } = await authApi.login(input);

    setCookie(TOKEN_KEY, token, { path: "/" });
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);
    return user;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      removeCookie(TOKEN_KEY);
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  };

  const isLoggedIn = user !== null;

  return { user, isLoggedIn, isLoading, login, logout };
}
