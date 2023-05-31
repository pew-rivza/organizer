import React from "react";

import { useStore } from "effector-react";

import { $addableCheckListId } from "CL_models/todo";
import { ListProps } from "CL_types/props";

import { AddableItem } from "./../Item/AddableItem";
import { EditableItem } from "./../Item/EditableItem";

import "./List.scss";

export const List: React.FC<ListProps> = ({ todos, checkListId }) => {
  const addableCheckListId = useStore<number | null>($addableCheckListId);

  return (
    <div className="cl_checklist_list">
      {todos.map((todo) => (
        <EditableItem key={todo.id} todo={todo} />
      ))}
      {checkListId === addableCheckListId && <AddableItem />}
    </div>
  );
};
