import { createEffect, createEvent, createStore } from "effector";

import { API_FETCH_TODOS } from "CL_api/todo";
import { Todo } from "CL_types/stores";

// Effects
export const fetchTodosFx = createEffect<void, Todo[]>(async () => {
  const todos = await API_FETCH_TODOS();
  return todos.map((todo) => ({
    ...todo,
    date: todo.date ? new Date(todo.date) : todo.date,
  }));
});

// Events
export const updateAddableCheckListId = createEvent<number | null>();

// Stores
export const $todos = createStore<Todo[]>([]).on(
  fetchTodosFx.doneData,
  (_, todos) => todos,
);

export const $addableCheckListId = createStore<number | null>(null).on(
  updateAddableCheckListId,
  (_, CheckListId) => CheckListId,
);
