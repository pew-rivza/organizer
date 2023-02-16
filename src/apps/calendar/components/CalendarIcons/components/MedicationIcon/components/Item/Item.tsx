import React from "react";

import { MedicationItemIconProps } from "CR_types/props";

import { joinCn } from "utils/joinCn";

export const Item: React.FC<MedicationItemIconProps> = ({
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
