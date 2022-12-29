import {AreaValue, EditedAreaValues} from "BW_types";
import {AREA_VALUES_URL} from "BW_const/api";

export const API_FETCH_AREA_VALUES = (wheelId: number | void): Promise<AreaValue[]> => fetch(`${AREA_VALUES_URL}${wheelId || -1}`, {
  method: "GET",
  body: null,
  headers: {},
}).then((response) => response.json());

export const API_UPDATE_AREA_VALUES = (wheelId: number | void, editedAreaValues: EditedAreaValues): Promise<void> => fetch(AREA_VALUES_URL, {
  method: "PUT",
  body: JSON.stringify({ wheelId, editedAreaValues }),
  headers: {
    "Content-Type": "application/json",
  },
}).then((response) => response.json());
