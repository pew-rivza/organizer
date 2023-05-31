import { AUTH_URL } from "const/api";
import { Auth } from "types/other";

export const API_AUTHENTICATE = (password: string): Promise<Auth> =>
  fetch(AUTH_URL, {
    method: "POST",
    body: JSON.stringify({ password }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
