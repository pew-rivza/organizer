import React from "react";
import { Todo } from "BW_types";
import { Item } from "BW_components/Todos/components/Item";
import "./List.scss";
import { ADD_TODO_MODE_ID } from "BW_const/index";
import { useStore } from "effector-react";
import { $addableAreaId } from "BW_models/todo";

type ListProps = {
  todos: Todo[];
  areaId: number;
};

export const List: React.FC<ListProps> = ({ todos, areaId }) => {
  const addableAreaId = useStore<number | null>($addableAreaId);

  return (
    <div className="bw_todos_list">
      {todos.map((todo) => (
        <Item key={todo.id} todo={todo} />
      ))}
      {areaId === addableAreaId && (
        <Item
          todo={{
            id: ADD_TODO_MODE_ID,
            name: "",
            checked: false,
          }}
        />
      )}
    </div>
  );
};
