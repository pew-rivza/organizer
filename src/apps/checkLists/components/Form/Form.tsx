import React, { KeyboardEvent } from "react";
import MaskedInput from "react-text-mask";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { ENTER_CODE, ESCAPE_CODE } from "const/common";

import { API_ADD_CHECK_LIST } from "CL_api/checkList";
import {
  $addedCheckList,
  cancelAddedCheckList,
  fetchCheckListsFx,
  updateAddedCheckList,
} from "CL_models/checkList";
import { CheckList } from "CL_types/stores";

import "./Form.scss";

export const Form: React.FC = () => {
  const addedCheckList = useStore<string | null>($addedCheckList);
  const fetchTodos = useEvent<void, CheckList[]>(fetchCheckListsFx);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    updateAddedCheckList(event.target.value);
  };

  const addCheckList = async (): Promise<void> => {
    if (addedCheckList !== null) {
      await API_ADD_CHECK_LIST({ name: addedCheckList });
      cancelAddedCheckList();
      await fetchTodos();
      toast("Чек-лист добавлен!", {
        toastId: 17,
        type: "success",
      });
    }
  };

  const cancelCheckList = () => {
    cancelAddedCheckList();
  };

  const todoKeyDownHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === ESCAPE_CODE) {
      cancelCheckList();
    }
    if (event.code === ENTER_CODE && addedCheckList) {
      await addCheckList();
    }
  };

  const inputBlurHandler = (): void => {
    if (!addedCheckList) {
      cancelCheckList();
    }
  };

  return addedCheckList !== null ? (
    <div className="cl_form">
      <MaskedInput
        type="text"
        autoFocus
        value={addedCheckList}
        mask={new Array(100).fill(/.*/)}
        onBlur={inputBlurHandler}
        onKeyDown={todoKeyDownHandler}
        guide={false}
        onChange={inputChangeHandler}
        max={100}
      />

      {addedCheckList && (
        <Icon
          icon="uil:save"
          className="cl_form-toolbar-save"
          onClick={addCheckList}
        />
      )}
      <Icon
        icon="radix-icons:cross-2"
        className="cl_form-toolbar-cancel"
        onClick={cancelCheckList}
      />
    </div>
  ) : null;
};
