import {Todo} from "BW_types";
import {TODOS_URL} from "BW_const/api";

export const API_FETCH_TODOS = (wheelId: number | void): Promise<Todo[]> => fetch(TODOS_URL(wheelId), {
  method: "GET",
  body: null,
  headers: {},
}).then((response) => response.json());
