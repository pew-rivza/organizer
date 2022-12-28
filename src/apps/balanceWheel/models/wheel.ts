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

// Stores
export const $wheels = createStore<Wheel[]>([]).on(
  fetchWheelsFx.doneData,
  (_, wheels) => wheels
);

export const $wheel = createStore<Wheel>({})
  .on(fetchWheelsFx.doneData, (_, wheels) => wheels[wheels.length - 1])
  .on(updateWheel, (_, wheel) => wheel);

export const $isNewWheel = createStore<boolean>(false)
  .on(updateIsNewWheel, (_, isNewWheel) => isNewWheel);

export const $newDate = createStore<string>(`${DEFAULT_DATE.getMonth() + 1}.${DEFAULT_DATE.getFullYear()}`)
  .on(updateNewDate, (_, newDate) => newDate);
