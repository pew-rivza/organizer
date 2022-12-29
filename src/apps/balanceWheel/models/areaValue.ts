import { createEffect, createEvent, createStore } from "effector";
import {AreaValue, EditedAreaValue, EditedAreaValues} from "BW_types";
import {API_FETCH_AREA_VALUES} from "../api/areaValue";
import {findObject} from "utils/objects";

// Effects
export const fetchAreaValuesFx = createEffect<number | void, AreaValue[]>(
  async (wheelId) => await API_FETCH_AREA_VALUES(wheelId)
);

// Events

export const editModeOn = createEvent();
export const editModeOff = createEvent();
export const updateAreaValues = createEvent<AreaValue[]>();
export const updatePreviousAreaValues = createEvent<AreaValue[]>();
export const updateEditedAreaValues = createEvent<EditedAreaValue>();
export const cancelEditedAreaValues = createEvent();
export const saveEditedAreasValues = createEvent<EditedAreaValues>()

// Stores
export const $areaValues = createStore<AreaValue[]>([])
  .on(updateAreaValues, (_, areaValues) => areaValues)
  .on(saveEditedAreasValues, (prevState, editedAreasValues) => {
    return prevState.map((areaValue) => {
      const editedAreasValuesArr: ({ areaId: number, value: number })[] = Object.values(editedAreasValues);
      const editedAreasValue = findObject(editedAreasValuesArr, "areaId", areaValue.BWAreaId)
      return {...areaValue, value: editedAreasValue?.value ?? areaValue.value}
    })
  });

export const $previousAreaValues = createStore<AreaValue[]>([]).on(
  updatePreviousAreaValues, (_, areaValues) => areaValues
);

export const $editMode = createStore<boolean>(false)
  .on(editModeOn, () => true)
  .on(editModeOff, () => false);

export const $editedAreaValues = createStore<EditedAreaValues>({})
  .on(updateEditedAreaValues, (prevState, editedAreaValue) => {
    const newState: EditedAreaValues = { ...prevState };
    newState[editedAreaValue.index] = { areaId: editedAreaValue.areaId, value: editedAreaValue.value };
    return newState;
  })
  .on(cancelEditedAreaValues, () => ({}));

// TODO: сделать кеширование запросов на получение areaValues и todos
