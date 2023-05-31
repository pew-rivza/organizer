import React, { ChangeEvent } from "react";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { DatePicker } from "components/DatePicker";
import { dateFormatter } from "const/common";
import { convertUTCDate } from "utils/date";

import { $currentDate } from "CR_models/calendar";
import { TodoItemDayProps } from "CR_types/props";

import { API_UPDATE_TODO } from "CL_api/todo";
import { fetchTodosFx } from "CL_models/todo";
import { Todo } from "CL_types/stores";

import "./Item.scss";

export const Item: React.FC<TodoItemDayProps> = ({ todo }) => {
  const currentDate = useStore<Date | null>($currentDate);
  const { checked } = todo;
  const fetchTodos = useEvent<Todo[]>(fetchTodosFx);

  const changeTodo = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    if (currentDate) {
      await API_UPDATE_TODO({ ...todo, checked: event.target.checked });
      fetchTodos();
    }
  };

  const cleanDate = async (): Promise<void> => {
    if (currentDate) {
      await API_UPDATE_TODO({ ...todo, date: null });
      fetchTodos();

      toast(`Задача убрана из плана на день`, {
        toastId: 19,
        type: "success",
      });
    }
  };

  const rescheduleTodo = async (date: Date | null): Promise<void> => {
    const convertedDate = convertUTCDate(date);
    if (convertedDate) {
      const formattedDate = dateFormatter.format(convertedDate);
      await API_UPDATE_TODO({ ...todo, date: convertedDate });
      toast(`Задача перенесена на ${formattedDate}`, {
        toastId: 19,
        type: "success",
      });
      fetchTodos();
    }
  };

  return (
    <div className="cr_day_todos_list-item">
      <div className="cr_day_todos_list-item-name">
        <div className="checkbox">
          <input
            type="checkbox"
            onChange={changeTodo}
            checked={checked}
            disabled={false}
          />
        </div>
        <div>{todo.name}</div>
      </div>

      <div className="cr_day_todos_list-item-toolbar">
        <DatePicker
          onChange={rescheduleTodo}
          selected={todo.date}
          customInput={
            <Icon
              icon="mdi:calendar-arrow-left"
              className="cr_day_todos_list-item-toolbar-reschedule"
              hFlip={true}
            />
          }
        />
        <Icon
          icon="radix-icons:cross-2"
          className="cr_day_todos_list-item-toolbar-cancel"
          onClick={cleanDate}
        />
      </div>
    </div>
  );
};
