import { createEffect, createEvent, createStore } from "effector";

import { findObject } from "utils/objects";

import { API_FETCH_CHECK_LISTS } from "CL_api/checkList";
import { $todos, fetchTodosFx } from "CL_models/todo";
import { CheckList, CheckListFullInfo } from "CL_types/stores";

// Effects
export const fetchCheckListsFx = createEffect<void, CheckList[]>(async () => {
  const checkLists = await API_FETCH_CHECK_LISTS();
  fetchTodosFx();
  return checkLists;
});

// Events
export const updateAddedCheckList = createEvent<string>();
export const cancelAddedCheckList = createEvent();
export const updateEditedCheckList = createEvent<CheckList>();
export const cancelEditedCheckList = createEvent();

// Stores
export const $checkLists = createStore<CheckList[]>([]).on(
  fetchCheckListsFx.doneData,
  (_, checkLists) => checkLists,
);

export const $checkListsFullInfo = createStore<CheckListFullInfo[]>([])
  .on($checkLists, (prevState, checkLists) => {
    return checkLists.map((checkList, i): CheckListFullInfo => {
      return {
        ...checkList,
        todos: prevState[i]?.todos || [],
      };
    });
  })
  .on($todos, (prevState, todos) => {
    const newState: CheckListFullInfo[] = [...prevState].map(
      (checkListFullInfo) => ({
        ...checkListFullInfo,
        todos: [],
      }),
    );

    todos.forEach((todo) => {
      const checkList: CheckListFullInfo =
        findObject<number, CheckListFullInfo>(
          newState,
          "id",
          todo.CLCheckListId || -1,
        ) || ({} as CheckListFullInfo);
      newState[newState.indexOf(checkList)].todos.push(todo);
    });

    return newState;
  });

export const $addedCheckList = createStore<string | null>(null)
  .on(updateAddedCheckList, (_, name) => {
    return name;
  })
  .on(cancelAddedCheckList, () => {
    return null;
  });

export const $editedCheckList = createStore<CheckList | null>(null)
  .on(updateEditedCheckList, (_, checkList) => {
    return checkList;
  })
  .on(cancelEditedCheckList, () => {
    return null;
  });
