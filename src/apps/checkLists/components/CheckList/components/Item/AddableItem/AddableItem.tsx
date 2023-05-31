import React, { useEffect, useRef, useState } from "react";
import MaskedInput from "react-text-mask";

import { useStore } from "effector-react";

import { convertUTCDate } from "utils/date";

import { API_ADD_TODO } from "CL_api/todo";
import { $addableCheckListId, updateAddableCheckListId } from "CL_models/todo";

import { ItemTemplate } from "./../ItemTemplate";

export const AddableItem: React.FC = () => {
  const [addedTodo, setAddedTodo] = useState<string>("");
  const [addedDate, setAddedDate] = useState<Date | null>(null);
  const addableCheckListId = useStore<number | null>($addableCheckListId);
  const inputRef = useRef<MaskedInput>(null);

  const saveHandler = async (): Promise<void> => {
    await API_ADD_TODO(
      addableCheckListId,
      addedTodo,
      convertUTCDate(addedDate),
    );
    setAddedTodo("");
    setAddedDate(null);
  };

  const cancelHandler = (): void => {
    setAddedTodo("");
    setAddedDate(null);
    updateAddableCheckListId(null);
  };

  const inputChangeHandler = (value: string): void => {
    setAddedTodo(value);
  };

  const dateChangeHandler = (value: Date): void => {
    setAddedDate(value);
  };

  useEffect(() => {
    inputRef.current?.inputElement.focus();
  }, [addedDate]);

  return (
    <ItemTemplate
      todo={{
        name: "",
        checked: false,
        date: null,
      }}
      disabledCheckbox={true}
      input={{
        show: true,
        value: addedTodo,
        onBlur: () => {},
        onChange: inputChangeHandler,
        ref: inputRef,
      }}
      date={{
        value: addedDate,
        onChange: dateChangeHandler,
      }}
      toolbar={{
        save: {
          show: !!addedTodo,
          handler: saveHandler,
          available: !!addedTodo,
        },
        cancel: {
          show: true,
          handler: cancelHandler,
        },
        delete: {
          show: false,
        },
      }}
    />
  );
};
