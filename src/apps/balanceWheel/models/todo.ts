import { createEffect, createStore } from "effector";
import { TODOS_URL } from "BW_const/api";
import { Todo } from "BW_types";

// Effects & Events
export const fetchTodosFx = createEffect<number | void, Todo[]>((wheelId) =>
  fetch(TODOS_URL(wheelId), {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json())
);

// Stores
export const $todos = createStore<Todo[]>([]).on(
  fetchTodosFx.doneData,
  (_, todos) => todos
);
