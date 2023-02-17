import React from "react";

import { Icon } from "@iconify/react";
import { useStore } from "effector-react";

import { joinCn } from "utils/joinCn";

import { $areasFullInfo } from "BW_models/area";
import { AreaFullInfo } from "BW_types/stores";

import "./QualityIndex.scss";

export const QualityIndex: React.FC = () => {
  const areasFullInfo = useStore<AreaFullInfo[]>($areasFullInfo);

  const [qualityIndex, previousQualityIndex] = areasFullInfo
    .reduce(
      ([sum, prevSum]: [number, number], area) => {
        return [sum + area.value, prevSum + (area.previousValue || 0)] as [
          number,
          number,
        ];
      },
      [0, 0],
    )
    .map((index) => +(index / areasFullInfo.length).toFixed(1));

  const cn = joinCn(
    qualityIndex > previousQualityIndex && "bw_todos_index-positive",
    qualityIndex < previousQualityIndex && "bw_todos_index-negative",
  );

  return (
    <div className="bw_todos_index">
      <Icon icon="mdi:lq" />
      {!!qualityIndex && <span className={cn}>{qualityIndex}</span>}{" "}
      {!!previousQualityIndex && (
        <span className="bw_todos_index-previous">{previousQualityIndex}</span>
      )}
    </div>
  );
};
