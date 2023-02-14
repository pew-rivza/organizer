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

export function getValuesByField<ObjType, ValueType>(
  objectsArray: (Obj & ObjType)[],
  field: string,
): ValueType[] {
  return objectsArray.map((obj) => obj[field]).filter(Boolean);
}

export const isObject = (item: any): boolean => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export const mergeDeep = (
  target: Record<string | number, any>,
  ...sources: Record<string | number, any>[]
): Record<string | number, any> => {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return mergeDeep(target, ...sources);
};
