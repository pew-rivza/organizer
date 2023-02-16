import React from "react";

import { joinCn } from "utils/joinCn";

import { MedicationItemProps } from "CR_types/props";

export const Item: React.FC<MedicationItemProps> = ({
  medication,
  isAllDay,
}) => {
  const { name, count, nominativeCountMeasure, frequency, times, checked } =
    medication;
  const cn = joinCn("cr_day_icons-medication-item", !!checked && "checked");

  return (
    <div className={cn}>
      {name} {count} {nominativeCountMeasure}{" "}
      {isAllDay && `${frequency} ${times}`}
    </div>
  );
};