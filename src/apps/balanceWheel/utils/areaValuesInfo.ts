import { findObject } from "utils/objects";

import { AreaFullInfo, AreaValue } from "BW_types/stores";

export const makeAreaValuesInfo = (
  prevState: AreaFullInfo[],
  areaValues: AreaValue[],
  fieldName: string,
): AreaFullInfo[] => {
  return prevState.map((areaFullInfo) => {
    const areaValue = findObject<number, AreaValue>(
      areaValues,
      "BWAreaId",
      areaFullInfo.id,
    );
    return { ...areaFullInfo, [fieldName]: areaValue?.value || 0 };
  });
};
