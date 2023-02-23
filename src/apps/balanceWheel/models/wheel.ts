import { createEffect, createEvent, createStore } from "effector";

import { API_FETCH_WHEELS } from "BW_api/wheel";
import { FORMATTED_DEFAULT_DATE } from "BW_const/common";
import {
  fetchAreaValuesFx,
  updateAreaValues,
  updatePreviousAreaValues,
} from "BW_models/areaValue";
import { fetchWheelTodosFx } from "BW_models/todo";
import { AreaValue, Wheel } from "BW_types/stores";

// Effects
export const fetchWheelsFx = createEffect<void, Wheel[]>(async () => {
  const wheels = await API_FETCH_WHEELS();
  wheels.length ? updateIsNewWheel(false) : updateIsNewWheel(true);
  const lastWheelId: number | void = wheels[wheels.length - 1]?.id;
  const previousWheelId: number | void = wheels[wheels.length - 2]?.id;
  const areaValues: AreaValue[] = await fetchAreaValuesFx(lastWheelId);
  const previousAreaValues: AreaValue[] = await fetchAreaValuesFx(
    previousWheelId,
  );
  updateAreaValues(areaValues);
  updatePreviousAreaValues(previousAreaValues);
  await fetchWheelTodosFx(lastWheelId);
  return wheels;
});

// Events
export const updateWheel = createEvent<Wheel>();
export const updateIsNewWheel = createEvent<boolean>();
export const updateNewDate = createEvent<string>();
export const updateEditedDate = createEvent<string>();
export const cancelEditedDate = createEvent();

// Stores
export const $wheels = createStore<Wheel[]>([]).on(
  fetchWheelsFx.doneData,
  (_, wheels) => wheels,
);

export const $wheel = createStore<Wheel>({})
  .on(fetchWheelsFx.doneData, (_, wheels) => wheels[wheels.length - 1])
  .on(updateWheel, (_, wheel) => wheel);

export const $isNewWheel = createStore<boolean>(false).on(
  updateIsNewWheel,
  (_, isNewWheel) => isNewWheel,
);

export const $newDate = createStore<string>(FORMATTED_DEFAULT_DATE).on(
  updateNewDate,
  (_, newDate) => newDate,
);

export const $editedDate = createStore<string | false>(false)
  .on(updateEditedDate, (_, editedDate) => editedDate)
  .on(cancelEditedDate, () => false);
