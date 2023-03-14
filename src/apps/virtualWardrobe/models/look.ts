import React from "react";

import { createEffect, createEvent, createStore } from "effector";
import Konva from "konva";

import { API_FETCH_LOOKS } from "VW_api/look";
import { EMPTY_LOOK } from "VW_const/common";
import { ChangedLook, DraggableImage, Look } from "VW_types/stores";

// Effects
export const fetchLooksFx = createEffect<void, Look[]>(
  async () => await API_FETCH_LOOKS(),
);

// Events
export const updateChangedLook = createEvent<ChangedLook>();
export const updateDraggableImage = createEvent<DraggableImage>();
export const cancelChangedLook = createEvent();
export const updateStageRef = createEvent<React.RefObject<Konva.Stage>>();

// Stores
export const $looks = createStore<Look[]>([]).on(
  fetchLooksFx.doneData,
  (_, looks) => looks,
);

export const $changedLook = createStore<ChangedLook>({
  ...EMPTY_LOOK,
})
  .on(updateChangedLook, (_, changedLook) => changedLook)
  .on(cancelChangedLook, () => ({ ...EMPTY_LOOK }));

export const $draggableImage = createStore<DraggableImage | null>(null).on(
  updateDraggableImage,
  (_, draggableImage) => draggableImage,
);

export const $stageRef = createStore<React.RefObject<Konva.Stage> | null>(
  null,
).on(updateStageRef, (_, stageRef) => stageRef);
