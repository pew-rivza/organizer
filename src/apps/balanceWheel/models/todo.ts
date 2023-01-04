import { createEffect, createEvent, createStore } from "effector";

import { API_FETCH_TODOS } from "BW_api/todo";
import { Todo } from "BW_types/stores";

// Effects
export const fetchTodosFx = createEffect<number | void, Todo[]>(
  async (wheelId) => await API_FETCH_TODOS(wheelId),
);

// Events
export const updateAddableAreaId = createEvent<number | null>();

// Stores
export const $todos = createStore<Todo[]>([]).on(
  fetchTodosFx.doneData,
  (_, todos) => todos,
);

export const $addableAreaId = createStore<number | null>(null).on(
  updateAddableAreaId,
  (_, areaId) => areaId,
);
