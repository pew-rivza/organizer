import { createEffect, createEvent, createStore } from "effector";
import {AreaValue, Wheel} from "BW_types";
import {DEFAULT_DATE} from "BW_const/index";
import {fetchAreaValuesFx, updateAreaValues, updatePreviousAreaValues} from "BW_models/areaValue";
import {fetchTodosFx} from "BW_models/todo";
import {API_FETCH_WHEELS} from "../api/wheel";

// Effects
export const fetchWheelsFx = createEffect<void, Wheel[]>(async () => {
    const wheels = await API_FETCH_WHEELS();
    const lastWheelId: number | void = wheels[wheels.length - 1]?.id;
    const previousWheelId: number | void = wheels[wheels.length - 2]?.id
    const areaValues: AreaValue[] = await fetchAreaValuesFx(lastWheelId);
    const previousAreaValues: AreaValue[] = await fetchAreaValuesFx(previousWheelId);
    updateAreaValues(areaValues);
    updatePreviousAreaValues(previousAreaValues);
    updateIsNewWheel(false);
    await fetchTodosFx(lastWheelId);
    return wheels;
  }
);

// Events
export const updateWheel = createEvent<Wheel>();
export const updateIsNewWheel = createEvent<boolean>();
export const updateNewDate = createEvent<string>();
export const updateEditedDate = createEvent<string>();
export const cancelEditedDate = createEvent();
export const saveEditedDate = createEvent<string>();

// Stores
export const $wheels = createStore<Wheel[]>([]).on(
  fetchWheelsFx.doneData,
  (_, wheels) => wheels
);

export const $wheel = createStore<Wheel>({})
  .on(fetchWheelsFx.doneData, (_, wheels) => wheels[wheels.length - 1])
  .on(updateWheel, (_, wheel) => wheel)
  .on(saveEditedDate, (prevState, editedDate) => {
    return {...prevState, date: editedDate};
  });

export const $isNewWheel = createStore<boolean>(false)
  .on(updateIsNewWheel, (_, isNewWheel) => isNewWheel);

export const $newDate = createStore<string>(`${DEFAULT_DATE.getMonth() + 1}.${DEFAULT_DATE.getFullYear()}`)
  .on(updateNewDate, (_, newDate) => newDate);

export const $editedDate = createStore<string | false>(false)
  .on(updateEditedDate, (_, editedDate) => {
    return editedDate;
  })
  .on(cancelEditedDate, () => {
    return false;
  });
