import { Obj } from "types/other";

import { GroupedObjects } from "MT_types/other";

export function groupObjectsByKeyValue<ObjType>(
  objectsArray: (ObjType & Obj)[],
  keyField: string,
): GroupedObjects<ObjType> {
  return objectsArray.reduce(
    (prevGroupedObjects: GroupedObjects<ObjType>, obj: ObjType & Obj) => {
      const newGroupedOptions = { ...prevGroupedObjects };
      if (!newGroupedOptions[obj[keyField]]) {
        newGroupedOptions[obj[keyField]] = [];
      }
      newGroupedOptions[obj[keyField]].push(obj);

      return newGroupedOptions;
    },
    {},
  );
}
