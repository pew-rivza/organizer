import { TODO_URL } from "BW_const/api";
import { Todo } from "BW_types/stores";

export const API_FETCH_TODOS = (wheelId: number | void): Promise<Todo[]> =>
  fetch(`${TODO_URL}${wheelId || -1}`, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_UPDATE_TODO = (
  todoId: number | void,
  data: { name?: string; checked?: boolean },
): Promise<void> =>
  fetch(TODO_URL, {
    method: "PUT",
    body: JSON.stringify({ data, todoId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_DELETE_TODO = (todoId: number | void): Promise<void> =>
  fetch(TODO_URL, {
    method: "DELETE",
    body: JSON.stringify({ todoId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_ADD_TODO = (
  wheelId: number | void,
  areaId: number | null,
  value: string,
): Promise<Todo> =>
  fetch(TODO_URL, {
    method: "POST",
    body: JSON.stringify({ wheelId, areaId, value }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
