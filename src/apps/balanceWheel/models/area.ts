import { createEffect, createStore } from "effector";
import { Area, AreaValue, AreaWithTodos, AreaWithValue, Todo } from "BW_types";
import { $areaValues } from "BW_models/areaValue";
import { findAllObjects, findObject } from "utils/objects";
import { AREA_URL } from "BW_const/api";
import { $todos } from "BW_models/todo";

// Effects & Events
export const fetchAreasFx = createEffect<void, Area[]>(() =>
  fetch(AREA_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json())
);

// Stores
export const $areas = createStore<Area[]>([]).on(
  fetchAreasFx.doneData,
  (_, areas) => areas
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

export const $areasWithTodos = $areas
  .map<AreaWithTodos[]>((areas) =>
    areas.map(
      (area): AreaWithTodos => ({
        id: area.id,
        name: area.name,
        icon: area.icon,
        todos: [],
      })
    )
  )
  .on($todos, (prevState, todos) => {
    return prevState.map((areaWithTodos) => {
      const areaTodos = findAllObjects<number, Todo>(
        todos,
        "BWAreaId",
        areaWithTodos.id
      ).map(
        (areaTodo): Todo => ({
          id: areaTodo.id,
          name: areaTodo.name,
          checked: areaTodo.checked,
        })
      );
      return { ...areaWithTodos, todos: areaTodos };
    });
  });
