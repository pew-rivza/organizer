import React from "react";
import "./Header.scss";
import { Icon } from "@iconify/react";
import { AreaFullInfo } from "BW_types";
import { updateAddableAreaId } from "BW_models/todo";

type HeaderProps = {
  area: AreaFullInfo;
};

export const Header: React.FC<HeaderProps> = ({ area }) => {
  const checkedTodosCount: number = area.todos.filter(
    (todo) => todo.checked
  ).length;
  const progress: number =
    area.todos.length && (checkedTodosCount * 100) / area.todos.length;

  const addTodo = () => {
    updateAddableAreaId(area.id);
  };

  return (
    <div className="bw_todos_header">
      <Icon icon={area.icon} width={17} />
      <div className="bw_todos-title">
        {area.name}
        <div className="bw_todos_header-toolbar">
          <div className="bw_todos_header-progress-bar">
            <div style={{ width: `${progress}%` }} />
          </div>
          <Icon icon="material-symbols:add" width={15} onClick={addTodo} />
        </div>
      </div>
    </div>
  );
};

// TODO: [late] вынести иконки в отдельный компонент, когда станет понятно, какие вообще иконки понадобятся
