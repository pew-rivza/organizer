import React, { KeyboardEvent } from "react";
import MaskedInput from "react-text-mask";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { ENTER_CODE, ESCAPE_CODE } from "const/common";

import { API_DELETE_CHECK_LIST, API_UPDATE_CHECK_LIST } from "CL_api/checkList";
import {
  $editedCheckList,
  cancelEditedCheckList,
  fetchCheckListsFx,
  updateEditedCheckList,
} from "CL_models/checkList";
import { updateAddableCheckListId } from "CL_models/todo";
import { HeaderProps } from "CL_types/props";
import { CheckList } from "CL_types/stores";

import "./Header.scss";

export const Header: React.FC<HeaderProps> = ({ checkList }) => {
  const fetchCheckLists = useEvent<CheckList[]>(fetchCheckListsFx);
  const editedCheckList = useStore<CheckList | null>($editedCheckList);

  const addTodo = (event: React.MouseEvent<SVGSVGElement>): void => {
    event.stopPropagation();
    updateAddableCheckListId(checkList.id || null);
  };

  const deleteCheckList = async (
    event: React.MouseEvent<SVGSVGElement>,
  ): Promise<void> => {
    event.stopPropagation();
    await API_DELETE_CHECK_LIST(checkList.id);
    toast("Чек-лист удален!", {
      toastId: 1,
      type: "success",
    });
    fetchCheckLists();
  };

  const makeCheckListEditable = (): void => {
    if (editedCheckList?.id !== checkList.id) {
      updateEditedCheckList(checkList);
    }
  };

  const cancelEditing = (event: React.MouseEvent<SVGSVGElement>) => {
    event.stopPropagation();
    cancelEditedCheckList();
  };

  const todoKeyDownHandler = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === ESCAPE_CODE) {
      cancelEditedCheckList();
    }
    if (event.code === ENTER_CODE && editedCheckList?.name) {
      await saveCheckList();
    }
  };

  const saveCheckList = async (event?: React.MouseEvent<SVGSVGElement>) => {
    event?.stopPropagation?.();
    await API_UPDATE_CHECK_LIST({
      id: checkList.id,
      name: editedCheckList?.name || "",
    });
    toast("Изменения сохранены!", {
      toastId: 18,
      type: "success",
    });
    cancelEditedCheckList();
    fetchCheckLists();
  };

  const inputChangeHandler = (value: string): void => {
    updateEditedCheckList({ ...editedCheckList, name: value });
  };

  const inputBlurHandler = (): void => {
    if (editedCheckList?.name === checkList.name) {
      cancelEditedCheckList();
    }
  };

  return (
    <div className="cl_checklist_header" onClick={makeCheckListEditable}>
      {editedCheckList?.id === checkList.id ? (
        <div className="cl_checklist_header-input">
          <MaskedInput
            type="text"
            autoFocus
            value={editedCheckList?.name || ""}
            mask={new Array(100).fill(/.*/)}
            onBlur={inputBlurHandler}
            onKeyDown={todoKeyDownHandler}
            guide={false}
            onChange={(event) => inputChangeHandler(event.target.value)}
            max={100}
            className=""
          />
          {editedCheckList?.name && (
            <Icon icon="uil:save" className="" onClick={saveCheckList} />
          )}
          <Icon
            icon="radix-icons:cross-2"
            className=""
            onClick={cancelEditing}
          />
        </div>
      ) : (
        checkList.name
      )}

      {editedCheckList?.id !== checkList.id && (
        <div className="cl_checklist_header-toolbar">
          <Icon
            icon="material-symbols:add"
            className="cl_checklist_header-add-todo"
            onClick={addTodo}
          />
          <Icon
            icon="ri:delete-bin-line"
            className="cl_checklist_header-delete-checklist"
            onClick={deleteCheckList}
          />
        </div>
      )}
    </div>
  );
};
