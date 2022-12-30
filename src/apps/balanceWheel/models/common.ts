import {createEvent, createStore} from "effector";

// Events
export const editModeOn = createEvent();
export const editModeOff = createEvent();

// Stores
export const $editMode = createStore<boolean>(false)
  .on(editModeOn, () => true)
  .on(editModeOff, () => false);
