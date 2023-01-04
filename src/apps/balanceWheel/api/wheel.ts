import { WHEEL_URL } from "BW_const/api";
import { Wheel } from "BW_types/stores";

export const API_FETCH_WHEELS = (): Promise<Wheel[]> =>
  fetch(WHEEL_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_ADD_WHEEL = (date: string): Promise<Wheel> =>
  fetch(WHEEL_URL, {
    method: "POST",
    body: JSON.stringify({ date }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_UPDATE_DATE = (
  wheelId: number | void,
  date: string,
): Promise<void> =>
  fetch(WHEEL_URL, {
    method: "PUT",
    body: JSON.stringify({ date, wheelId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_DELETE_WHEEL = (wheelId: number | void): Promise<void> =>
  fetch(WHEEL_URL, {
    method: "DELETE",
    body: JSON.stringify({ wheelId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
