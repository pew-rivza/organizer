import { createEffect, createEvent, createStore } from "effector";

import { API_FETCH_MEDICATIONS } from "MT_api/medication";
import { EMPTY_MEDICATION } from "MT_const/common";
import {
  ChangedMedication,
  Medication,
  UpdateHandlerArgs,
} from "MT_types/stores";

// Effects
export const fetchMedicationsFx = createEffect<void, Medication[]>(
  async () => await API_FETCH_MEDICATIONS(),
);

// Events
export const updateChangedMedication = createEvent<UpdateHandlerArgs>();
export const addChangedMedication = createEvent();
export const removeChangedMedication = createEvent<number>();
export const cancelChangedMedications = createEvent();
export const setChangedMedications = createEvent<ChangedMedication[]>();

// Stores
export const $medications = createStore<Medication[]>([]).on(
  fetchMedicationsFx.doneData,
  (_, medications) => {
    return medications.map((medication) => {
      return {
        ...medication,
        periodDateStart: medication.periodDateStart
          ? new Date(medication.periodDateStart)
          : null,
        periodDateEnd: medication.periodDateEnd
          ? new Date(medication.periodDateEnd)
          : null,
      };
    });
  },
);

export const $changedMedications = createStore<ChangedMedication[]>([
  { ...EMPTY_MEDICATION },
])
  .on(updateChangedMedication, (prevState, { index = 0, field, value }) => {
    const newState: ChangedMedication[] = [...prevState];
    newState[index][field] = value;
    return newState;
  })
  .on(addChangedMedication, (prevState) => {
    return [...prevState, { ...EMPTY_MEDICATION }];
  })
  .on(removeChangedMedication, (prevState, index) => {
    const newState = [...prevState];
    newState.splice(index, 1);
    return newState;
  })
  .on(cancelChangedMedications, () => [{ ...EMPTY_MEDICATION }])
  .on(setChangedMedications, (_, changedMedications) => changedMedications);
