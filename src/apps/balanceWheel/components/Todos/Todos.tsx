import React from "react";
import "./Todos.scss";
import { useStore } from "effector-react";
import { $areasFullInfo } from "BW_models/area";
import { AreaFullInfo } from "BW_types";
import { $isNewWheel } from "BW_models/wheel";
import { Header } from "BW_components/Todos/components/Header";
import { List } from "BW_components/Todos/components/List";
import { $addableAreaId } from "BW_models/todo";

export const Todos: React.FC = () => {
  const areasFullInfo = useStore<AreaFullInfo[]>($areasFullInfo);
  const isNewWheel = useStore<boolean>($isNewWheel);
  const addableAreaId = useStore<number | null>($addableAreaId);

  return isNewWheel ? null : (
    <div className="bw_todos">
      {areasFullInfo.map((area) => {
        return (
          <React.Fragment key={area.id}>
            <Header area={area} />
            {(!!area.todos.length || area.id === addableAreaId) && (
              <List todos={area.todos} areaId={area.id} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
