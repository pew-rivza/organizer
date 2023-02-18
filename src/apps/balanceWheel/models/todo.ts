import { createEffect, createEvent, createStore } from "effector";

import { API_FETCH_TODOS, API_FETCH_WHEEL_TODOS } from "BW_api/todo";
import { Todo } from "BW_types/stores";

// Effects
export const fetchTodosFx = createEffect<void, Todo[]>(
  async () => await API_FETCH_TODOS(),
);

export const fetchWheelTodosFx = createEffect<number | void, Todo[]>(
  async (wheelId) => await API_FETCH_WHEEL_TODOS(wheelId),
);

// Events
export const updateAddableAreaId = createEvent<number | null>();

// Stores
export const $allTodos = createStore<Todo[]>([]).on(
  fetchTodosFx.doneData,
  (_, todos) => todos,
);

export const $todos = createStore<Todo[]>([]).on(
  fetchWheelTodosFx.doneData,
  (_, todos) => todos,
);

export const $addableAreaId = createStore<number | null>(null).on(
  updateAddableAreaId,
  (_, areaId) => areaId,
);
