import React from "react";
import "./Todos.scss";
import { useStore } from "effector-react";
import { Icon } from "@iconify/react";
import { $areasWithTodos } from "BW_models/area";
import { AreaWithTodos } from "BW_types";

export const Todos: React.FC<{}> = () => {
  const areasWithTodos = useStore<AreaWithTodos[]>($areasWithTodos);
  return (
    <div className="bw_todos">
      {areasWithTodos.map((area) => (
        <React.Fragment key={area.id}>
          <div className="bw_todos-area-name">
            <Icon icon={area.icon} />
            <div className="bw_todos-header">
              {area.name}
              {!!area.todos.length && (
                <div className="bw_todos-progress-bar">
                  <div
                    style={{
                      width: `${
                        (area.todos.filter((todo) => todo.checked).length *
                          100) /
                        area.todos.length
                      }%`,
                    }}
                  ></div>
                </div>
              )}
            </div>
          </div>
          {!!area.todos.length && (
            <div className="bw_todos-list">
              {area.todos.map((todo) => (
                <div key={todo.id} className="bw_todo">
                  <div className="bw_todo-checkbox">
                    <input type="checkbox" defaultChecked={todo.checked} />
                  </div>
                  <div className="bw_todos-header bw_todo-name">
                    {todo.name}
                    <Icon
                      icon="radix-icons:cross-2"
                      className="bw_todo-delete"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
