import React from "react";

import { Icon } from "@iconify/react";

import { Item } from "CR_subpages/Day/components/Todos/components/Item";
import { TodosDayProps } from "CR_types/props";

import "./Todos.scss";

export const Todos: React.FC<TodosDayProps> = ({ todos }) => {
  return todos.length ? (
    <div className="cr_day_todos">
      <div className="cr_day_todos_header">
        <Icon
          icon="material-symbols:check-box-outline-sharp"
          className="cr_day_todos_header-icon"
        />
        План на день
      </div>
      <div className="cr_day_todos_list">
        {todos.map((todo) => (
          <Item key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  ) : null;
};
