import { createEffect, createStore } from "effector";
import { Todo } from "BW_types";
import {API_FETCH_TODOS} from "../api/todo";

// Effects & Events
export const fetchTodosFx = createEffect<number | void, Todo[]>(async (wheelId) =>
  await API_FETCH_TODOS(wheelId)
);

// Stores
export const $todos = createStore<Todo[]>([]).on(
  fetchTodosFx.doneData,
  (_, todos) => todos
);
