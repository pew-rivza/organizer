import React, { KeyboardEvent } from "react";
import MaskedInput from "react-text-mask";

import { Icon } from "@iconify/react";
import { useEvent } from "effector-react";

import { DatePicker } from "components/DatePicker";
import { dateFormatter, ENTER_CODE, ESCAPE_CODE } from "const/common";
import { joinCn } from "utils/joinCn";

import { API_UPDATE_TODO } from "CL_api/todo";
import { fetchTodosFx } from "CL_models/todo";
import { ItemTemplateProps } from "CL_types/props";
import { Todo } from "CL_types/stores";

import "./ItemTemplate.scss";

export const ItemTemplate: React.FC<ItemTemplateProps> = ({
  todo,
  disabledCheckbox,
  input,
  date,
  onClick,
  toolbar,
}) => {
  const formattedDate = date.value
    ? dateFormatter.format(date.value)
    : undefined;
  const fetchTodos = useEvent<void, Todo[]>(fetchTodosFx);

  const millisecondsDifference =
    new Date().getTime() - new Date(todo.createdAt as string).getTime();
  const daysCoefficient = 1000 * 60 * 60 * 24;
  const daysDifference = Math.trunc(millisecondsDifference / daysCoefficient);
  const isAging = !todo.checked && daysDifference > 14;
  const isOutdated = !todo.checked && daysDifference > 30;

  const todoKeyDownHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === ESCAPE_CODE) {
      toolbar.cancel.handler?.();
    }
    if (event.code === ENTER_CODE && toolbar.save.available) {
      await updateTodo();
    }
  };

  const updateTodo = async (): Promise<void> => {
    await toolbar.save.handler?.();
    await fetchTodos();
  };

  const toggleTodo = async (): Promise<void> => {
    await API_UPDATE_TODO({ ...todo, checked: !todo.checked });
    await fetchTodos();
  };

  const itemCn = joinCn(
    "cl_checklist_item-name-content",
    isAging && "cl_checklist_item-name-content-is-aging",
    isOutdated && "cl_checklist_item-name-content-is-outdated",
  );

  return (
    <div className="cl_checklist_item">
      <div className="cl_checklist_item-checkbox checkbox">
        <input
          type="checkbox"
          onChange={toggleTodo}
          defaultChecked={todo.checked}
          disabled={disabledCheckbox}
        />
      </div>
      <div className="cl_checklist_item-title cl_checklist_item-name">
        {input.show ? (
          <React.Fragment>
            <DatePicker
              onChange={date.onChange}
              value={formattedDate}
              wrapperClassNames={["cl_checklist_item-date-wrapper"]}
              inputSize={10}
              selected={date.value}
              isClearable={true}
            />
            <MaskedInput
              type="text"
              value={input.value}
              mask={new Array(100).fill(/.*/)}
              onBlur={input.onBlur}
              onKeyDown={todoKeyDownHandler}
              guide={false}
              onChange={(event) => input.onChange(event.target.value)}
              max={100}
              className="cl_checklist_item-input"
              ref={input.ref}
            />
          </React.Fragment>
        ) : (
          <div className={itemCn} onClick={onClick}>
            {todo.date && (
              <span className="cl_checklist_item-name-date">
                {dateFormatter.format(todo.date)}
              </span>
            )}{" "}
            {todo.name}
          </div>
        )}

        <div className="cl_checklist_item-toolbar">
          {toolbar.save.show && (
            <Icon
              icon="uil:save"
              className="cl_checklist_item-toolbar-save"
              onClick={updateTodo}
            />
          )}
          {toolbar.cancel.show && (
            <Icon
              icon="radix-icons:cross-2"
              className="cl_checklist_item-toolbar-cancel"
              onClick={toolbar.cancel.handler}
            />
          )}
          {toolbar.delete.show && (
            <Icon
              icon="ri:delete-bin-line"
              className="cl_checklist_item-toolbar-delete"
              onClick={toolbar.delete.handler}
            />
          )}
        </div>
      </div>
    </div>
  );
};
