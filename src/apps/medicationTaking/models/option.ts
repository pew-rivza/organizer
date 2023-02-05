import { createEffect, createStore } from "effector";

import { API_FETCH_OPTIONS } from "MT_api/option";
import { GroupedOptions, Option } from "MT_types/stores";
import { groupObjectsByKeyValue } from "MT_utils/groupObjects";

// Effects
export const fetchOptionsFx = createEffect<void, Option[]>(
  async () => await API_FETCH_OPTIONS(),
);

// Stores
export const $options = createStore<GroupedOptions>({}).on(
  fetchOptionsFx.doneData,
  (_, DBOptions) => {
    return groupObjectsByKeyValue<Option>(DBOptions, "key");
  },
);
