import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "effector-react";

import { $calendarData, updateCurrentDate } from "CR_models/calendar";
import { DayData, DayParams } from "CR_types/other";
import { CalendarData } from "CR_types/stores";

import { Medications } from "./components/Medications";
import { Toolbar } from "./components/Toolbar";

import "./Day.scss";

export const Day: React.FC = () => {
  const calendarData = useStore<CalendarData>($calendarData);
  const { timestamp } = useParams() as DayParams;
  const date: Date = new Date(+timestamp);
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
      <Toolbar date={date} />
      <Medications medications={dayData?.medications || []} />
    </div>
  );
};
