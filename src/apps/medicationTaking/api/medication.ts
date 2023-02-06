import { MEDICATION_URL } from "MT_const/api";
import { Medication } from "MT_types/stores";

export const API_FETCH_MEDICATIONS = (): Promise<Medication[]> =>
  fetch(MEDICATION_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_ADD_MEDICATIONS = (
  medications: Medication[],
  courseId: number | null,
): Promise<Medication[]> =>
  fetch(MEDICATION_URL, {
    method: "POST",
    body: JSON.stringify({ medications, courseId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_UPDATE_MEDICATIONS = (
  medications: Medication[],
  courseId: number | null,
): Promise<Medication[]> =>
  fetch(MEDICATION_URL, {
    method: "PUT",
    body: JSON.stringify({ medications, courseId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
