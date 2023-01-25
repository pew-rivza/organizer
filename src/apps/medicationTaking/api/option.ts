import { OPTION_URL } from "MT_const/api";
import { DBOption } from "MT_types/other";

export const API_FETCH_OPTIONS = (): Promise<DBOption[]> =>
  fetch(OPTION_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());
