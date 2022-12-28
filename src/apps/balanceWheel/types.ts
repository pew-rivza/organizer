export interface Wheel {
  id?: number;
  date?: string;
}

export interface Area {
  id: number;
  name: string;
  icon: string;
}

export interface AreaValue {
  id: number;
  value: number;
}

export interface EditedAreaValue {
  index: number;
  value: number;
}

export interface EditedAreaValues {
  [index: number]: number;
}

export interface Todo {
  id: number;
  name: string;
  checked: boolean;
}

export interface AreasFullInfo {
  id: number;
  name: string;
  icon: string;
  value: number;
  previousValue: number;
  todos: Todo[];
}
