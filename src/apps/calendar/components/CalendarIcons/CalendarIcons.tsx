import React from "react";

import { dateFormatter } from "const/common";
import { useStore } from "effector-react";

import { $calendarData } from "CR_models/calendar";
import { DayData } from "CR_types/other";
import { CalendarIconsProps } from "CR_types/props";
import { CalendarData } from "CR_types/stores";

import { MedicationIcon } from "./components/MedicationIcon";

import "./CalendarIcons.scss";

export const CalendarIcons: React.FC<CalendarIconsProps> = ({
  date,
  disabled,
}) => {
  const calendarData = useStore<CalendarData>($calendarData);
  const id = dateFormatter.format(date);
  const dayData: DayData =
    calendarData?.[date.getFullYear()]?.[date.getMonth()]?.[date.getDate()];

  return (
    <div className="cr_day_icons">
      {dayData?.medications && (
        <MedicationIcon
          id={id}
          medications={dayData.medications}
          disabled={disabled}
        />
      )}
    </div>
  );
};
