import { Icon } from "@iconify/react";
import React from "react";

import { updateAddableAreaId } from "BW_models/todo";
import { HeaderProps } from "BW_types/props";

import "./Header.scss";

export const Header: React.FC<HeaderProps> = ({ area }) => {
  const checkedTodosCount: number = area.todos.filter(
    (todo) => todo.checked,
  ).length;
  const progress: number =
    area.todos.length && (checkedTodosCount * 100) / area.todos.length;

  const addTodo = (): void => {
    updateAddableAreaId(area.id);
  };

  return (
    <div className="bw_todos_header">
      <Icon icon={area.icon} className="bw_todos_header-area-icon" />
      <div className="bw_todos-title">
        {area.name}
        <div className="bw_todos_header-toolbar">
          <div className="bw_todos_header-progress-bar">
            <div style={{ width: `${progress}%` }} />
          </div>
          <Icon
            icon="material-symbols:add"
            className="bw_todos_header-add-todo"
            onClick={addTodo}
          />
        </div>
      </div>
    </div>
  );
};
