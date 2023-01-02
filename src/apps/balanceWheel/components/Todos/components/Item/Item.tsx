import React, { KeyboardEvent, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Todo, Wheel } from "BW_types";
import "./Item.scss";
import MaskedInput from "react-text-mask";
import {
  API_ADD_TODO,
  API_DELETE_TODO,
  API_UPDATE_TODO,
} from "../../../../api/todo";
import { useEvent, useStore } from "effector-react";
import {
  $addableAreaId,
  fetchTodosFx,
  updateAddableAreaId,
} from "BW_models/todo";
import { $wheel } from "BW_models/wheel";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { ADD_TODO_MODE_ID, ENTER_CODE, ESCAPE_CODE } from "BW_const/index";

type ItemProps = {
  todo: Todo;
};

export const Item: React.FC<ItemProps> = ({ todo }) => {
  const [editedTodo, setEditedTodo] = useState<string | false>(false);
  const fetchTodos = useEvent<number | void, Todo[]>(fetchTodosFx);
  const wheel = useStore<Wheel>($wheel);
  const addMode = todo.id === ADD_TODO_MODE_ID;
  const [addedTodo, setAddedTodo] = useState<string>("");
  const addableAreaId = useStore<number | null>($addableAreaId);
  const inputRef = useRef<MaskedInput & HTMLInputElement>(null);

  const inputBlurHandler = (): void => {
    if (!addedTodo) {
      updateAddableAreaId(null);
    }
    if (editedTodo === todo.name) {
      setEditedTodo(false);
    }
  };

  const inputChangeHandler = (value: string): void => {
    addMode ? setAddedTodo(value) : setEditedTodo(value);
  };

  const todoKeyDownHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === ESCAPE_CODE) {
      cancelEditing();
    }
    if (event.code === ENTER_CODE) {
      await updateTodo();
    }
  };

  const todoClickHandler = (): void => {
    setEditedTodo(todo.name);
  };

  const updateTodo = async (): Promise<void> => {
    if (addMode) {
      await API_ADD_TODO(wheel.id, addableAreaId, addedTodo);
      setAddedTodo("");
      inputRef.current?.focus?.() || inputRef.current?.inputElement?.focus?.();
    } else {
      await API_UPDATE_TODO(todo.id, { name: editedTodo || "" });
      setEditedTodo(false);
      toast("Изменения сохранены!", {
        toastId: nanoid(4),
        type: "success",
      });
    }
    await fetchTodos(wheel.id);
  };

  // TODO: обернуть все async-и в try-catch

  const deleteTodo = async (): Promise<void> => {
    await API_DELETE_TODO(todo.id);
    await fetchTodos(wheel.id);
    toast("Пункт удален!", {
      toastId: nanoid(4),
      type: "success",
    });
  };

  const cancelEditing = () => {
    if (addMode) {
      setAddedTodo("");
      updateAddableAreaId(null);
    } else {
      setEditedTodo(false);
    }
  };

  const toggleTodo = async (): Promise<void> => {
    await API_UPDATE_TODO(todo.id, { checked: !todo.checked });
    await fetchTodos(wheel.id);
  };

  return (
    <div className="bw_todos_item">
      <div className="bw_todos_item-checkbox">
        <input
          type="checkbox"
          onChange={toggleTodo}
          defaultChecked={todo.checked}
          disabled={addMode || typeof editedTodo === "string"}
        />
      </div>
      <div className="bw_todos-title bw_todos_item-name">
        {typeof editedTodo === "string" || addMode ? (
          <MaskedInput
            type="text"
            autoFocus
            value={addMode ? addedTodo : editedTodo || ""}
            mask={new Array(100).fill(/.*/)}
            onBlur={inputBlurHandler}
            onKeyDown={todoKeyDownHandler}
            guide={false}
            onChange={(event) => inputChangeHandler(event.target.value)}
            max={100}
            className="bw_todos_item-input"
            ref={inputRef}
          />
        ) : (
          <div
            className="bw_todos_item-name-content"
            onClick={todoClickHandler}
          >
            {todo.name}
          </div>
        )}

        <div className="bw_todos_item-toolbar">
          {typeof editedTodo === "string" || addMode ? (
            <React.Fragment>
              {(typeof editedTodo === "string" || addedTodo) && (
                <Icon
                  icon="uil:save"
                  className="bw_todos_item-toolbar-save"
                  onClick={updateTodo}
                />
              )}
              <Icon
                icon="radix-icons:cross-2"
                className="bw_todos_item-toolbar-cancel"
                onClick={cancelEditing}
              />
            </React.Fragment>
          ) : (
            <Icon
              icon="ri:delete-bin-line"
              className="bw_todos_item-toolbar-delete"
              onClick={deleteTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
};
