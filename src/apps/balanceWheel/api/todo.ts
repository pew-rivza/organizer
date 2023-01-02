import { Todo } from "BW_types";
import { TODOS_URL } from "BW_const/api";

export const API_FETCH_TODOS = (wheelId: number | void): Promise<Todo[]> =>
  fetch(`${TODOS_URL}${wheelId || -1}`, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_UPDATE_TODO = (
  todoId: number,
  data: { name?: string; checked?: boolean }
): Promise<void> =>
  fetch(TODOS_URL, {
    method: "PUT",
    body: JSON.stringify({ data, todoId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_DELETE_TODO = (todoId: number): Promise<void> =>
  fetch(TODOS_URL, {
    method: "DELETE",
    body: JSON.stringify({ todoId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_ADD_TODO = (
  wheelId: number | void,
  areaId: number | null,
  value: string
): Promise<Todo> =>
  fetch(TODOS_URL, {
    method: "POST",
    body: JSON.stringify({ wheelId, areaId, value }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
