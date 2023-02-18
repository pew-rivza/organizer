import React, { useState } from "react";
import { toast } from "react-toastify";

import { useEvent, useStore } from "effector-react";

import { API_DELETE_TODO, API_UPDATE_TODO } from "BW_api/todo";
import { fetchWheelTodosFx } from "BW_models/todo";
import { $wheel } from "BW_models/wheel";
import { EditableItemProps } from "BW_types/props";
import { Todo, Wheel } from "BW_types/stores";

import { ItemTemplate } from "./../ItemTemplate";

export const EditableItem: React.FC<EditableItemProps> = ({ todo }) => {
  const [editedTodo, setEditedTodo] = useState<string | false>(false);
  const fetchTodos = useEvent<number | void, Todo[]>(fetchWheelTodosFx);
  const wheel = useStore<Wheel>($wheel);
  const todoEditMode: boolean = typeof editedTodo === "string";

  const saveHandler = async (): Promise<void> => {
    await API_UPDATE_TODO(todo.id, { name: editedTodo || "" });
    setEditedTodo(false);
    toast("Изменения сохранены!", {
      toastId: 3,
      type: "success",
    });
  };

  const cancelHandler = (): void => {
    setEditedTodo(false);
  };

  const deleteHandler = async (): Promise<void> => {
    await API_DELETE_TODO(todo.id);
    await fetchTodos(wheel.id);
    toast("Пункт удален!", {
      toastId: 4,
      type: "success",
    });
  };

  const inputBlurHandler = (): void => {
    if (editedTodo === todo.name) {
      setEditedTodo(false);
    }
  };

  const inputChangeHandler = (value: string): void => {
    setEditedTodo(value);
  };

  const todoClickHandler = (): void => {
    setEditedTodo(todo.name);
  };

  return (
    <ItemTemplate
      todo={todo}
      disabledCheckbox={todoEditMode}
      onClick={todoClickHandler}
      input={{
        show: todoEditMode,
        value: editedTodo || "",
        onBlur: inputBlurHandler,
        onChange: inputChangeHandler,
      }}
      toolbar={{
        save: {
          show: todoEditMode,
          handler: saveHandler,
        },
        cancel: {
          show: todoEditMode,
          handler: cancelHandler,
        },
        delete: {
          show: !todoEditMode,
          handler: deleteHandler,
        },
      }}
    />
  );
};
