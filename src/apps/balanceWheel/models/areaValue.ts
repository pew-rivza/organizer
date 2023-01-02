import { createEffect, createEvent, createStore } from "effector";
import { AreaValue, EditedAreaValue, EditedAreaValues } from "BW_types";
import { API_FETCH_AREA_VALUES } from "../api/areaValue";

// Effects
export const fetchAreaValuesFx = createEffect<number | void, AreaValue[]>(
  async (wheelId) => await API_FETCH_AREA_VALUES(wheelId)
);

// Events
export const updateAreaValues = createEvent<AreaValue[]>();
export const updatePreviousAreaValues = createEvent<AreaValue[]>();
export const updateEditedAreaValues = createEvent<EditedAreaValue>();
export const cancelEditedAreaValues = createEvent();

// Stores
export const $areaValues = createStore<AreaValue[]>([]).on(
  updateAreaValues,
  (_, areaValues) => areaValues
);

// TODO: разобраться с неймингами areaValue
// TODO: [late] создать тему

export const $previousAreaValues = createStore<AreaValue[]>([]).on(
  updatePreviousAreaValues,
  (_, areaValues) => areaValues
);

export const $editedAreaValues = createStore<EditedAreaValues>({})
  .on(updateEditedAreaValues, (prevState, editedAreaValue) => {
    const newState: EditedAreaValues = { ...prevState };
    newState[editedAreaValue.index] = {
      areaId: editedAreaValue.areaId,
      value: editedAreaValue.value,
    };
    return newState;
  })
  .on(cancelEditedAreaValues, () => ({}));
