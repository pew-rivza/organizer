import { createEffect, createStore } from "effector";

import { API_FETCH_CHECKED_MEDICATIONS } from "CR_api/medication";
import { CheckedMedications } from "CR_types/stores";

// Effects
export const fetchCheckedMedicationsFx = createEffect<
  void,
  CheckedMedications[]
>(async () => {
  const checkedMedications = await API_FETCH_CHECKED_MEDICATIONS();
  return checkedMedications.map((checkedMedication) => ({
    ...checkedMedication,
    date: new Date(checkedMedication.date),
  }));
});

// Stores
export const $checkedMedications = createStore<CheckedMedications[]>([]).on(
  fetchCheckedMedicationsFx.doneData,
  (_, checkedMedications) => checkedMedications,
);
