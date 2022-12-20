// Метод массива. Находит в массиве объектов объект, у которого
// заданное поле равно заданному значению
export const findObject = (arr: any[], field: string, value: any) => {
  for (let obj of arr) {
    if (obj[field] === value) {
      return obj;
    }
  }
  return;
}
 // TODO: эту функцию нужно переделать (joinArrayOfObjects)
export const joinArrayOfObjects = (entity1: { arr: { [x: string]: any; }[]; field: string | number; include: any; }, entity2: { arr: any[]; field: string; include: any; }) => {
  const joinedArray = (entity1.arr || []).map((entity1Obj: { [x: string]: any; }) => {
    const entity2Obj = findObject((entity2.arr || []), entity2.field, entity1Obj[entity1.field]) || {};
    let joinedObj = {};
    for (let field of entity1.include) {
      // @ts-ignore
      joinedObj[field.name] = entity1Obj[field.name] || field.default;
    }

    for (let field of entity2.include) {
      // @ts-ignore
      joinedObj[field.name] = entity2Obj[field.name] || field.default;
    }

    return joinedObj;
  });

  return joinedArray;
}
