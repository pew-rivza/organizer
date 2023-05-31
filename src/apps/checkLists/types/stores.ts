export interface CheckList {
  id?: number;
  name: string;
}

export interface Todo {
  id?: number;
  name: string;
  checked: boolean;
  date: Date | null;
  CLCheckListId?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface CheckListFullInfo extends CheckList {
  todos: Todo[];
}
