import React from "react";

import { Icon } from "@iconify/react";
import { useStore } from "effector-react";

import { CheckList } from "CL_components/CheckList";
import { Form } from "CL_components/Form";
import { $checkListsFullInfo, updateAddedCheckList } from "CL_models/checkList";
import { CheckListFullInfo } from "CL_types/stores";

import "./App.scss";

export const App: React.FC = () => {
  const checkListsFullInfo = useStore<CheckListFullInfo[]>($checkListsFullInfo);

  const buttonClickHandler = (): void => {
    updateAddedCheckList("");
  };

  return (
    <div data-testid="check-lists" className="cl">
      <button
        className="cl_button-add icon-button"
        onClick={buttonClickHandler}
      >
        <Icon icon="material-symbols:add" />
      </button>

      <Form />

      <div className="cl_checklists">
        {checkListsFullInfo.map((checkList) => (
          <CheckList key={checkList.id} checkList={checkList} />
        ))}
      </div>
    </div>
  );
};
