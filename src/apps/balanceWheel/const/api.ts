export const WHEEL_URL = "/api/balancewheel/wheel/";
export const AREA_URL = "/api/balancewheel/area/";
export const AREA_VALUES_URL = (wheelId: number | void) =>
  `/api/balancewheel/areavalue/${wheelId || ""}`;
export const TODOS_URL = (wheelId: number | void) =>
  `/api/balancewheel/todo/${wheelId || ""}`;
