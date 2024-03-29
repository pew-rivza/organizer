import { createEffect, createEvent, createStore } from "effector";

import { API_FETCH_CLOTHES } from "VW_api/clothes";
import { EMPTY_CLOTHES } from "VW_const/common";
import { ChangedClothes, Clothes, GroupedClothes } from "VW_types/stores";

// Effects
export const fetchClothesFx = createEffect<void, Clothes[]>(
  async () => await API_FETCH_CLOTHES(),
);

// Events
export const updateChangedClothes = createEvent<ChangedClothes>();
export const cancelChangedClothes = createEvent();

// Stores
export const $clothes = createStore<Clothes[]>([]).on(
  fetchClothesFx.doneData,
  (_, clothes) => clothes,
);

export const $changedClothes = createStore<ChangedClothes>({
  ...EMPTY_CLOTHES,
})
  .on(updateChangedClothes, (_, changedClothes) => changedClothes)
  .on(cancelChangedClothes, () => ({ ...EMPTY_CLOTHES }));

export const $groupedClothes = createStore<GroupedClothes>({}).on(
  $clothes,
  (prevGroupedClothes, clothes) => {
    const newGroupedClothes: GroupedClothes = {};

    clothes.forEach((cloth) => {
      newGroupedClothes[cloth.VWCategoryId] =
        newGroupedClothes[cloth.VWCategoryId] || [];
      newGroupedClothes[cloth.VWCategoryId].push(cloth);
    });
    return newGroupedClothes;
  },
);
