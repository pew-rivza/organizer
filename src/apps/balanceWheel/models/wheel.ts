import { createEffect, createEvent, createStore } from "effector";
import { Wheel } from "BW_types";
import { WHEEL_URL } from "BW_const/api";

// Effects & Events
export const fetchWheelsFx = createEffect<void, Wheel[]>(() =>
  fetch(WHEEL_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((req) => req.json())
);

export const updateWheel = createEvent<Wheel>();

// Stores
export const $wheels = createStore<Wheel[]>([]).on(
  fetchWheelsFx.doneData,
  (_, result) => result
);

export const $wheel = createStore<Wheel>({})
  .on(fetchWheelsFx.doneData, (_, wheels) => wheels[wheels.length - 1])
  .on(updateWheel, (_, wheel) => wheel);
