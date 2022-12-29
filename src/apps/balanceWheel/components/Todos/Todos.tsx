import React from "react";
import "./Todos.scss";
import { useStore } from "effector-react";
import { Icon } from "@iconify/react";
import {$areasFullInfo} from "BW_models/area";
import {AreaFullInfo} from "BW_types";
import {$isNewWheel} from "BW_models/wheel";

export const Todos: React.FC = () => {
  const areasFullInfo = useStore<AreaFullInfo[]>($areasFullInfo);
  const isNewWheel = useStore<boolean>($isNewWheel);
  return (
    isNewWheel ? null : (
      <div className="bw_todos">
        {areasFullInfo.map((area) => (
          <React.Fragment key={area.id}>
            <div className="bw_todos-area-name">
              <Icon icon={area.icon} />
              <div className="bw_todos-header">
                {area.name}
                <div className="bw_todos-progress-bar">
                  <div
                    style={{
                      width: !!area.todos.length ? `${
                        (area.todos.filter((todo) => todo.checked).length *
                          100) /
                        area.todos.length
                      }%` : 0,
                    }}
                  ></div>
                </div>
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
    )
  );
};

// TODO: (3) отрефакторить компонент Todos
