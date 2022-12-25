import { createEffect, createEvent, createStore } from "effector";
import { AreaValue, EditedAreaValues } from "BW_types";
import { AREA_VALUES_URL } from "BW_const/api";

// Effects & Events
export const fetchAreaValuesFx = createEffect<number | void, AreaValue[]>(
  (wheelId) =>
    fetch(AREA_VALUES_URL(wheelId), {
      method: "GET",
      body: null,
      headers: {},
    }).then((response) => response.json())
);

export const editModeOn = createEvent();
export const editModeOff = createEvent();
export const updateEditedAreaValues = createEvent<{
  index: number;
  value: number;
}>();
export const cancelEditedAreaValues = createEvent();

// Stores
export const $areaValues = createStore<AreaValue[]>([]).on(
  fetchAreaValuesFx.doneData,
  (_, areaValues) => areaValues
);

export const $editMode = createStore<boolean>(false)
  .on(editModeOn, () => true)
  .on(editModeOff, () => false);

export const $editedAreaValues = createStore<EditedAreaValues>({})
  .on(updateEditedAreaValues, (prevState, { index, value }) => {
    const newState: EditedAreaValues = { ...prevState };
    newState[index] = value;
    return newState;
  })
  .on(cancelEditedAreaValues, () => ({}));

// TODO: сделать кеширование запросов на получение areaValues и todos
