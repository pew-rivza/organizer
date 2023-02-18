import React from "react";

import { useStore } from "effector-react";

import { $addableAreaId } from "BW_models/todo";
import { ListProps } from "BW_types/props";

import { AddableItem } from "./../Item/AddableItem";
import { EditableItem } from "./../Item/EditableItem";

import "./List.scss";

export const List: React.FC<ListProps> = ({ todos, areaId }) => {
  const addableAreaId = useStore<number | null>($addableAreaId);

  return (
    <div className="bw_todos_list">
      {todos.map((todo) => (
        <EditableItem key={todo.id} todo={todo} />
      ))}
      {areaId === addableAreaId && <AddableItem />}
    </div>
  );
};
