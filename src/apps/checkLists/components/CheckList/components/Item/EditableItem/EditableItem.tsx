import React, { useEffect, useRef, useState } from "react";
import MaskedInput from "react-text-mask";
import { toast } from "react-toastify";

import { useEvent } from "effector-react";

import { convertUTCDate } from "utils/date";

import { API_DELETE_TODO, API_UPDATE_TODO } from "CL_api/todo";
import { fetchTodosFx } from "CL_models/todo";
import { EditableItemProps } from "CL_types/props";
import { Todo } from "CL_types/stores";

import { ItemTemplate } from "./../ItemTemplate";

export const EditableItem: React.FC<EditableItemProps> = ({ todo }) => {
  const [editedTodo, setEditedTodo] = useState<string | false>(false);
  const [editedDate, setEditedDate] = useState<Date | null>(null);
  const fetchTodos = useEvent<void, Todo[]>(fetchTodosFx);
  const todoEditMode: boolean = typeof editedTodo === "string";
  const inputRef = useRef<MaskedInput>(null);

  const saveHandler = async (): Promise<void> => {
    await API_UPDATE_TODO({
      ...todo,
      name: editedTodo || "",
      date: convertUTCDate(editedDate),
    });
    setEditedTodo(false);
    setEditedDate(null);
    toast("Изменения сохранены!", {
      toastId: 3,
      type: "success",
    });
  };

  const cancelHandler = (): void => {
    setEditedTodo(false);
    setEditedDate(null);
  };

  const deleteHandler = async (): Promise<void> => {
    await API_DELETE_TODO(todo.id);
    await fetchTodos();
    toast("Пункт удален!", {
      toastId: 4,
      type: "success",
    });
  };

  const inputChangeHandler = (value: string): void => {
    setEditedTodo(value);
  };

  const dateChangeHandler = (value: Date): void => {
    setEditedDate(value);
  };

  useEffect(() => {
    inputRef.current?.inputElement.focus();
  }, [editedDate]);

  const todoClickHandler = (): void => {
    setEditedTodo(todo.name);
    setEditedDate(todo.date);
  };

  return (
    <ItemTemplate
      todo={todo}
      disabledCheckbox={todoEditMode}
      onClick={todoClickHandler}
      input={{
        show: todoEditMode,
        value: editedTodo || "",
        onBlur: () => {},
        onChange: inputChangeHandler,
        ref: inputRef,
      }}
      date={{
        value: editedDate,
        onChange: dateChangeHandler,
      }}
      toolbar={{
        save: {
          show: todoEditMode && !!editedTodo,
          handler: saveHandler,
          available: !!editedTodo,
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
