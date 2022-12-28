import {AreaValue} from "BW_types";
import {AREA_VALUES_URL} from "BW_const/api";

export const API_FETCH_AREA_VALUES = (wheelId: number | void): Promise<AreaValue[]> => fetch(AREA_VALUES_URL(wheelId), {
  method: "GET",
  body: null,
  headers: {},
}).then((response) => response.json());
