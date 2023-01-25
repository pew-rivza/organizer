import { createEvent, createStore } from "effector";

import { Course, UpdateHandlerArgs } from "MT_types/stores";

// Events
export const updateChangedCourse = createEvent<UpdateHandlerArgs>();

// Stores
export const $changedCourse = createStore<Course>({
  start: null,
  doctor: "",
  diagnosis: "",
}).on(updateChangedCourse, (prevState, { field, value }) => {
  return {
    ...prevState,
    [field]: value,
  };
});
