import { Medication } from "MT_types/stores";

import { LOOK_URL } from "VW_const/api";
import { ChangedLook, Look } from "VW_types/stores";

export const API_FETCH_LOOKS = (): Promise<Look[]> =>
  fetch(LOOK_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_ADD_LOOK = (look: ChangedLook): Promise<Look> => {
  return fetch(LOOK_URL, {
    method: "POST",
    body: JSON.stringify({ look }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
};

export const API_UPDATE_LOOK = (look: ChangedLook): Promise<Medication[]> =>
  fetch(LOOK_URL, {
    method: "PUT",
    body: JSON.stringify({ look }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_DELETE_LOOK = (lookId: number | void): Promise<void> =>
  fetch(LOOK_URL, {
    method: "DELETE",
    body: JSON.stringify({ lookId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
