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
  BWAreaId: number;
}

export interface EditedAreaValue {
  index: number;
  areaId: number;
  value: number;
}

export interface EditedAreaValues {
  [index: number]: {
    areaId: number;
    value: number;
  };
}

export interface Todo {
  id: number;
  name: string;
  checked: boolean;
}

export interface AreaFullInfo {
  id: number;
  name: string;
  icon: string;
  value: number;
  previousValue: number;
  todos: Todo[];
}

export interface DragData {
  plugins: {
    dragData: {
      round: 0;
      onDragEnd: (
        e: MouseEvent,
        datasetIndex: number,
        index: number,
        value: number
      ) => void;
    };
  };
}
