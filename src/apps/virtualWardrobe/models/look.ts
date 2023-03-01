import { createEvent, createStore } from "effector";

import { EMPTY_LOOK } from "VW_const/common";
import { ChangedLook, DraggableImage } from "VW_types/stores";

// Events
export const updateChangedLook = createEvent<ChangedLook>();
export const updateDraggableImage = createEvent<DraggableImage>();
export const cancelChangedLook = createEvent();

// Stores
export const $changedLook = createStore<ChangedLook>({
  ...EMPTY_LOOK,
})
  .on(updateChangedLook, (_, changedLook) => changedLook)
  .on(cancelChangedLook, () => ({ ...EMPTY_LOOK }));

export const $draggableImage = createStore<DraggableImage | null>(null).on(
  updateDraggableImage,
  (_, draggableImage) => draggableImage,
);
