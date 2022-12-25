// Метод массива. Находит в массиве объектов объект, у которого
// заданное поле равно заданному значению
export function findObject<ValueType, ObjType>(
  arr: ObjType[],
  field: string,
  value: ValueType
): ObjType | undefined {
  // @ts-ignore
  return arr.find((obj) => obj[field] === value);
}

export function findAllObjects<ValueType, ObjType>(
  arr: ObjType[],
  field: string,
  value: ValueType
): ObjType[] {
  // @ts-ignore
  return arr.filter((obj) => obj[field] === value);
}
