import React from "react";

import { DayCellContentArg } from "@fullcalendar/core";

import { CalendarIcons } from "CR_components/CalendarIcons";

import "./DayCell.scss";

export const DayCell: React.FC<DayCellContentArg> = (dayCell) => {
  const { date, isOther } = dayCell;

  return (
    <div className="cr_day_cell">
      <div>{dayCell.dayNumberText}</div>
      <CalendarIcons date={date} disabled={isOther} />
    </div>
  );
};
