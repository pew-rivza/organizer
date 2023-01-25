import { createEvent, createStore } from "effector";

import { EMPTY_MEDICATION } from "MT_const/common";
import { Medication, UpdateHandlerArgs } from "MT_types/stores";

// Events
export const updateChangedMedication = createEvent<UpdateHandlerArgs>();
export const addChangedMedication = createEvent();
export const removeChangedMedication = createEvent<number>();

// Stores
export const $changedMedications = createStore<Medication[]>([
  { ...EMPTY_MEDICATION },
])
  .on(updateChangedMedication, (prevState, { index = 0, field, value }) => {
    const newState: Medication[] = [...prevState];
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
  });
