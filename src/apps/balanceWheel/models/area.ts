import { createEffect, createStore } from "effector";
import { Area, AreaFullInfo, AreaValue, Todo } from "BW_types";
import { $areaValues, $previousAreaValues } from "BW_models/areaValue";
import { findAllObjects, findObject } from "utils/objects";
import { $todos } from "BW_models/todo";
import { API_FETCH_AREAS } from "../api/area";

// Effects
export const fetchAreasFx = createEffect<void, Area[]>(
  async () => await API_FETCH_AREAS()
);

// Stores
export const $areas = createStore<Area[]>([]).on(
  fetchAreasFx.doneData,
  (_, areas) => areas
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
        })
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
        areaFullInfo.id
      ).map(
        (areaTodo): Todo => ({
          id: areaTodo.id,
          name: areaTodo.name,
          checked: areaTodo.checked,
        })
      );
      return { ...areaFullInfo, todos: areaTodos };
    });
  });

// utils
const makeAreaValuesInfo = (
  prevState: AreaFullInfo[],
  areaValues: AreaValue[],
  fieldName: string
) => {
  return prevState.map((areaFullInfo) => {
    const areaValue = findObject<number, AreaValue>(
      areaValues,
      "BWAreaId",
      areaFullInfo.id
    );
    return { ...areaFullInfo, [fieldName]: areaValue?.value || 0 };
  });
};
