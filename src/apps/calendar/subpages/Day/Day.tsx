import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "effector-react";

import { $calendarData, updateCurrentDate } from "CR_models/calendar";
import { DayData } from "CR_types/other";
import { CalendarData } from "CR_types/stores";

import { DayDate } from "./components/DayDate";
import { Medications } from "./components/Medications";

import "./Day.scss";

export const Day: React.FC = () => {
  const calendarData = useStore<CalendarData>($calendarData);
  const { timestamp } = useParams();
  const date: Date | null = timestamp ? new Date(+timestamp) : null;
  const dayData: DayData | null = date
    ? calendarData?.[date.getFullYear()]?.[date.getMonth()]?.[date.getDate()]
    : null;

  useEffect(() => {
    if (timestamp) {
      updateCurrentDate(new Date(+timestamp));
    }
  }, [timestamp]);

  return (
    <div className="cr_day">
      <DayDate date={date} />
      <Medications medications={dayData?.medications || []} />
    </div>
  );
};
