import { OPTION_URL } from "MT_const/api";
import { Option } from "MT_types/stores";

export const API_FETCH_OPTIONS = (): Promise<Option[]> =>
  fetch(OPTION_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());
