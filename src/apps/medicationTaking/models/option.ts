import { createEffect, createStore } from "effector";

import { API_FETCH_OPTIONS } from "MT_api/option";
import { DBOption, GroupedOptions } from "MT_types/other";
import { groupObjectsByKeyValue } from "MT_utils/groupObjectsByKey";

// Effects
export const fetchOptionsFx = createEffect<void, DBOption[]>(
  async () => await API_FETCH_OPTIONS(),
);

// Stores
export const $options = createStore<GroupedOptions>({}).on(
  fetchOptionsFx.doneData,
  (_, DBOptions) => {
    return groupObjectsByKeyValue<DBOption>(DBOptions, "key");
  },
);
