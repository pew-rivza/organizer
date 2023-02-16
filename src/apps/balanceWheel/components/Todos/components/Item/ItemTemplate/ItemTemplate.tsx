import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";
import React, { KeyboardEvent } from "react";
import MaskedInput from "react-text-mask";

import { API_UPDATE_TODO } from "BW_api/todo";
import { ENTER_CODE, ESCAPE_CODE } from "BW_const/common";
import { fetchTodosFx } from "BW_models/todo";
import { $wheel } from "BW_models/wheel";
import { ItemTemplateProps } from "BW_types/props";
import { Todo, Wheel } from "BW_types/stores";

import "./ItemTemplate.scss";

export const ItemTemplate: React.FC<ItemTemplateProps> = ({
  todo,
  disabledCheckbox,
  input,
  onClick,
  toolbar,
}) => {
  const fetchTodos = useEvent<number | void, Todo[]>(fetchTodosFx);
  const wheel = useStore<Wheel>($wheel);

  const todoKeyDownHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === ESCAPE_CODE) {
      toolbar.cancel.handler?.();
    }
    if (event.code === ENTER_CODE) {
      await updateTodo();
    }
  };

  const updateTodo = async (): Promise<void> => {
    await toolbar.save.handler?.();
    await fetchTodos(wheel.id);
  };

  const toggleTodo = async (): Promise<void> => {
    await API_UPDATE_TODO(todo.id, { checked: !todo.checked });
    await fetchTodos(wheel.id);
  };

  return (
    <div className="bw_todos_item">
      <div className="bw_todos_item-checkbox checkbox">
        <input
          type="checkbox"
          onChange={toggleTodo}
          defaultChecked={todo.checked}
          disabled={disabledCheckbox}
        />
      </div>
      <div className="bw_todos-title bw_todos_item-name">
        {input.show ? (
          <MaskedInput
            type="text"
            autoFocus
            value={input.value}
            mask={new Array(100).fill(/.*/)}
            onBlur={input.onBlur}
            onKeyDown={todoKeyDownHandler}
            guide={false}
            onChange={(event) => input.onChange(event.target.value)}
            max={100}
            className="bw_todos_item-input"
            ref={input.ref}
          />
        ) : (
          <div className="bw_todos_item-name-content" onClick={onClick}>
            {todo.name}
          </div>
        )}

        <div className="bw_todos_item-toolbar">
          {toolbar.save.show && (
            <Icon
              icon="uil:save"
              className="bw_todos_item-toolbar-save"
              onClick={updateTodo}
            />
          )}
          {toolbar.cancel.show && (
            <Icon
              icon="radix-icons:cross-2"
              className="bw_todos_item-toolbar-cancel"
              onClick={toolbar.cancel.handler}
            />
          )}
          {toolbar.delete.show && (
            <Icon
              icon="ri:delete-bin-line"
              className="bw_todos_item-toolbar-delete"
              onClick={toolbar.delete.handler}
            />
          )}
        </div>
      </div>
    </div>
  );
};
