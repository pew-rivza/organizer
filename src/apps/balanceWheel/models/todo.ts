import { createEffect, createEvent, createStore } from "effector";
import { Todo } from "BW_types";
import { API_FETCH_TODOS } from "../api/todo";

// Effects & Events
export const fetchTodosFx = createEffect<number | void, Todo[]>(
  async (wheelId) => await API_FETCH_TODOS(wheelId)
);

export const updateAddableAreaId = createEvent<number | null>();

// Stores
export const $todos = createStore<Todo[]>([]).on(
  fetchTodosFx.doneData,
  (_, todos) => todos
);

export const $addableAreaId = createStore<number | null>(null).on(
  updateAddableAreaId,
  (_, areaId) => areaId
);
