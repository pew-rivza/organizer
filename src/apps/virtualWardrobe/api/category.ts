import { CATEGORY_URL } from "VW_const//api";
import { Category } from "VW_types/stores";

export const API_FETCH_CATEGORIES = (): Promise<Category[]> =>
  fetch(CATEGORY_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());
