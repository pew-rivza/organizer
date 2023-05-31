import { CHECK_LIST_URL } from "CL_const/api";
import { CheckList } from "CL_types/stores";

export const API_FETCH_CHECK_LISTS = (): Promise<CheckList[]> =>
  fetch(CHECK_LIST_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_ADD_CHECK_LIST = (data: CheckList): Promise<CheckList> =>
  fetch(CHECK_LIST_URL, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_UPDATE_CHECK_LIST = (data: CheckList): Promise<void> =>
  fetch(CHECK_LIST_URL, {
    method: "PUT",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_DELETE_CHECK_LIST = (
  checkListId: number | void,
): Promise<void> =>
  fetch(CHECK_LIST_URL, {
    method: "DELETE",
    body: JSON.stringify({ checkListId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
