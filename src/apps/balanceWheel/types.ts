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
  [key: string]: any;
}

export interface AreaWithValue {
  id: number;
  name: string;
  value: number;
}

export interface EditedAreaValues {
  [index: number]: number;
}
