import React, { useEffect } from "react";
import { Tooltip } from "react-tooltip";

import { useEvent, useStore } from "effector-react";

import { $allTodos, fetchTodosFx } from "BW_models/todo";
import { Todo } from "BW_types/stores";

import { WheelTodosProps } from "CR_types/props";

import "./WheelTodos.scss";

export const WheelTodos: React.FC<WheelTodosProps> = ({ isOpen }) => {
  const fetchTodos = useEvent<Todo[]>(fetchTodosFx);
  const todos = useStore<Todo[]>($allTodos);
  const uncheckedTodos = todos.filter((todo) => !todo.checked);

  useEffect(() => {
    fetchTodos();
    const button = document.querySelector(".fc-wheel-button");
    (button as HTMLButtonElement).id = "wheel-unchecked";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tooltip
      className="cr_wheel_todos"
      anchorId="wheel-unchecked"
      isOpen={isOpen}
      place="right"
    >
      {uncheckedTodos.length ? (
        <ul className="dashed-list">
          {uncheckedTodos.map((todo) => (
            <li key={todo.id}>{todo.name}</li>
          ))}
        </ul>
      ) : (
        <div>Все задачи сделаны!</div>
      )}
    </Tooltip>
  );
};
