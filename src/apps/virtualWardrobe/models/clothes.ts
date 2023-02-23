import { createEvent, createStore } from "effector";

import { EMPTY_CLOTHES } from "VW_const/common";
import { ChangedClothes } from "VW_types/stores";

// Events
export const updateChangedClothes = createEvent<ChangedClothes>();
export const cancelChangedClothes = createEvent();

// Stores
export const $changedClothes = createStore<ChangedClothes>({
  ...EMPTY_CLOTHES,
})
  .on(updateChangedClothes, (_, changedClothes) => changedClothes)
  .on(cancelChangedClothes, () => ({ ...EMPTY_CLOTHES }));
