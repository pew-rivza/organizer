import { createEffect, createStore } from "effector";

import { findAllObjects } from "utils/objects";

import { API_FETCH_AREAS } from "BW_api/area";
import { $areaValues, $previousAreaValues } from "BW_models/areaValue";
import { $todos } from "BW_models/todo";
import { Area, AreaFullInfo, Todo } from "BW_types/stores";
import { makeAreaValuesInfo } from "BW_utils/areaValuesInfo";

// Effects
export const fetchAreasFx = createEffect<void, Area[]>(
  async () => await API_FETCH_AREAS(),
);

// Stores
export const $areas = createStore<Area[]>([]).on(
  fetchAreasFx.doneData,
  (_, areas) => areas,
);

export const $areasFullInfo = createStore<AreaFullInfo[]>([])
  .on($areas, (prevState, areas) => {
    if (!prevState.length) {
      return areas.map(
        (area): AreaFullInfo => ({
          id: area.id,
          name: area.name,
          icon: area.icon,
          value: 0,
          previousValue: 0,
          todos: [],
        }),
      );
    }
    return prevState;
  })
  .on($areaValues, (prevState, areaValues) => {
    return makeAreaValuesInfo(prevState, areaValues, "value");
  })
  .on($previousAreaValues, (prevState, prevAreaValues) => {
    return makeAreaValuesInfo(prevState, prevAreaValues, "previousValue");
  })
  .on($todos, (prevState, todos) => {
    return prevState.map((areaFullInfo) => {
      const areaTodos = findAllObjects<number, Todo>(
        todos,
        "BWAreaId",
        areaFullInfo.id,
      ).map(
        (areaTodo): Todo => ({
          id: areaTodo.id,
          name: areaTodo.name,
          checked: areaTodo.checked,
        }),
      );
      return { ...areaFullInfo, todos: areaTodos };
    });
  });
