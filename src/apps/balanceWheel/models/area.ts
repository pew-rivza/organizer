import { createEffect, createStore } from "effector";
import { Area, AreaValue, AreaWithValue } from "BW_types";
import { $areaValues } from "BW_models/areaValue";
import { findObject } from "utils/objects";
import { AREA_URL } from "BW_const/api";

// Effects & Events
export const fetchAreasFx = createEffect<void, Area[]>(() =>
  fetch(AREA_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((req) => req.json())
);

// Stores
export const $areas = createStore<Area[]>([]).on(
  fetchAreasFx.doneData,
  (state, result) => result
);

export const $areasWithValues = $areas
  .map<AreaWithValue[]>((areas) =>
    areas.map(
      (area): AreaWithValue => ({ id: area.id, name: area.name, value: 0 })
    )
  )
  .on($areaValues, (prevState, areaValues) => {
    return prevState.map((areaWithValue) => {
      const areaValue = findObject<number, AreaValue>(
        areaValues,
        "BWAreaId",
        areaWithValue.id
      );
      return { ...areaWithValue, value: areaValue?.value || 0 };
    });
  });
