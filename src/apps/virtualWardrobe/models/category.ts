import { createEffect, createStore } from "effector";

import { API_FETCH_CATEGORIES } from "VW_api/category";
import { Category } from "VW_types/stores";

// Effects
export const fetchCategoriesFx = createEffect<void, Category[]>(
  async () => await API_FETCH_CATEGORIES(),
);

// Stores
export const $categories = createStore<Category[]>([]).on(
  fetchCategoriesFx.doneData,
  (_, categories) => categories,
);
