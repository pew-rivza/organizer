import React from "react";

import { Header } from "CL_components/CheckList/components/Header";
import { List } from "CL_components/CheckList/components/List";
import { CheckListProps } from "CL_types/props";

import "./CheckList.scss";

export const CheckList: React.FC<CheckListProps> = ({ checkList }) => {
  const freshTodos = checkList.todos.filter((todo) => {
    const millisecondsDifference =
      new Date().getTime() - new Date(todo.updatedAt as string).getTime();
    const daysCoefficient = 1000 * 60 * 60 * 24;
    const daysDifference = Math.trunc(millisecondsDifference / daysCoefficient);
    return !todo.checked || (todo.checked && daysDifference <= 3);
  });

  return (
    <div className="cl_checklist">
      <Header checkList={checkList} />
      {checkList.id && checkList.todos && (
        <List todos={freshTodos} checkListId={checkList.id} />
      )}
    </div>
  );
};
