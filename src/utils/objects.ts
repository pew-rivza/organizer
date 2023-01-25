import { Obj } from "types/other";

export function findObject<ValueType, ObjType>(
  arr: (ObjType & Obj)[],
  field: string,
  value: ValueType,
): (ObjType & Obj) | undefined {
  return arr.find((obj) => obj[field] === value);
}

export function findAllObjects<ValueType, ObjType>(
  arr: (ObjType & Obj)[],
  field: string,
  value: ValueType,
): (ObjType & Obj)[] {
  return arr.filter((obj) => obj[field] === value);
}
