import React from "react";

import { joinCn } from "utils/joinCn";

import { MedicationItemIconProps } from "CR_types/props";

export const Item: React.FC<MedicationItemIconProps> = ({
  medication,
  isAllDay,
}) => {
  const { name, count, nominativeCountMeasure, frequency, times, checked } =
    medication;
  const cn = joinCn("cr_day_icons-medication-item", !!checked && "checked");

  return (
    <li className={cn}>
      {name} {count} {nominativeCountMeasure}{" "}
      {isAllDay && `${frequency} ${times}`}
    </li>
  );
};
