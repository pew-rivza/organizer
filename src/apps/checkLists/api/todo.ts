import { TODO_URL } from "CL_const/api";
import { Todo } from "CL_types/stores";

export const API_FETCH_TODOS = (): Promise<Todo[]> =>
  fetch(TODO_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_UPDATE_TODO = (data: Todo): Promise<void> =>
  fetch(TODO_URL, {
    method: "PUT",
    body: JSON.stringify({ data }),
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
  checkListId: number | null,
  value: string,
  date: Date | null,
): Promise<Todo> =>
  fetch(TODO_URL, {
    method: "POST",
    body: JSON.stringify({ date, value, checkListId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
