import { AREA_URL } from "BW_const/api";
import { Area } from "BW_types/stores";

export const API_FETCH_AREAS = (): Promise<Area[]> =>
  fetch(AREA_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());
