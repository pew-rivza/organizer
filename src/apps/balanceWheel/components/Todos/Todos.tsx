import { useStore } from "effector-react";
import React from "react";

import { $areasFullInfo } from "BW_models/area";
import { $addableAreaId } from "BW_models/todo";
import { $isNewWheel } from "BW_models/wheel";
import { AreaFullInfo } from "BW_types/stores";

import { Header } from "./components/Header";
import { List } from "./components/List";

import "./Todos.scss";

export const Todos: React.FC = () => {
  const areasFullInfo = useStore<AreaFullInfo[]>($areasFullInfo);
  const isNewWheel = useStore<boolean>($isNewWheel);
  const addableAreaId = useStore<number | null>($addableAreaId);

  return isNewWheel ? null : (
    <div className="bw_todos">
      {areasFullInfo.map((area) => {
        const renderList: boolean =
          !!area.todos.length || area.id === addableAreaId;

        return (
          <React.Fragment key={area.id}>
            <Header area={area} />
            {renderList && <List todos={area.todos} areaId={area.id} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
