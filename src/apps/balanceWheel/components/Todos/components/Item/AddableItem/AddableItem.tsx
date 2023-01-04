import { useStore } from "effector-react";
import React, { useRef, useState } from "react";
import MaskedInput from "react-text-mask";

import { API_ADD_TODO } from "BW_api/todo";
import { $addableAreaId, updateAddableAreaId } from "BW_models/todo";
import { $wheel } from "BW_models/wheel";
import { Wheel } from "BW_types/stores";

import { ItemTemplate } from "./../ItemTemplate";

export const AddableItem: React.FC = () => {
  const [addedTodo, setAddedTodo] = useState<string>("");
  const wheel = useStore<Wheel>($wheel);
  const addableAreaId = useStore<number | null>($addableAreaId);
  const inputRef = useRef<MaskedInput & HTMLInputElement>(null);

  const saveHandler = async (): Promise<void> => {
    await API_ADD_TODO(wheel.id, addableAreaId, addedTodo);
    setAddedTodo("");
    inputRef.current?.focus?.() || inputRef.current?.inputElement?.focus?.();
  };

  const cancelHandler = (): void => {
    setAddedTodo("");
    updateAddableAreaId(null);
  };

  const inputBlurHandler = (): void => {
    if (!addedTodo) {
      updateAddableAreaId(null);
    }
  };

  const inputChangeHandler = (value: string): void => {
    setAddedTodo(value);
  };

  return (
    <ItemTemplate
      todo={{
        name: "",
        checked: false,
      }}
      disabledCheckbox={true}
      input={{
        show: true,
        value: addedTodo,
        onBlur: inputBlurHandler,
        onChange: inputChangeHandler,
      }}
      toolbar={{
        save: {
          show: !!addedTodo,
          handler: saveHandler,
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
