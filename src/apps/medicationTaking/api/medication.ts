import { MEDICATION_URL } from "MT_const/api";
import { PreparedMedication } from "MT_types/other";
import { Medication } from "MT_types/stores";

export const API_ADD_MEDICATIONS = (
  medications: PreparedMedication[],
  courseId: number | null,
): Promise<Medication[]> =>
  fetch(MEDICATION_URL, {
    method: "POST",
    body: JSON.stringify({ medications, courseId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
