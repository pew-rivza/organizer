import React from "react";

import { Chips } from "components/Chips";

import { FieldChipsProps } from "MT_types/props";

import "./FieldChips.scss";

export const FieldChips: React.FC<FieldChipsProps> = ({
  visibleChips,
  onChoose,
}) => {
  return (
    <div className="mt_form_medication_chips">
      {visibleChips.timesOfDay && (
        <Chips
          icon="material-symbols:add"
          onClick={() => onChoose("timesOfDay")}
        >
          Время&nbsp;суток
        </Chips>
      )}

      {visibleChips.mealTime && (
        <Chips icon="material-symbols:add" onClick={() => onChoose("mealTime")}>
          Время&nbsp;приема
        </Chips>
      )}

      {visibleChips.comment && (
        <Chips icon="material-symbols:add" onClick={() => onChoose("comment")}>
          Комментарий
        </Chips>
      )}
    </div>
  );
};
