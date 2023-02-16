import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useEvent, useStore } from "effector-react";

import { fetchCoursesFx } from "MT_models/course";
import { fetchOptionsFx } from "MT_models/option";
import { Course as CourseType, Option } from "MT_types/stores";

import { $calendarData, updateCurrentDate } from "CR_models/calendar";
import { fetchCheckedMedicationsFx } from "CR_models/medication";
import { DayData } from "CR_types/other";
import { CalendarData, CheckedMedications } from "CR_types/stores";

import { DayDate } from "./components/DayDate";
import { Medications } from "./components/Medications";

import "./Day.scss";

export const Day: React.FC = () => {
  const calendarData = useStore<CalendarData>($calendarData);
  const fetchCourses = useEvent<CourseType[]>(fetchCoursesFx);
  const fetchOptions = useEvent<Option[]>(fetchOptionsFx);
  const fetchCheckedMedications = useEvent<CheckedMedications[]>(
    fetchCheckedMedicationsFx,
  );

  const { timestamp } = useParams();
  const date: Date | null = timestamp ? new Date(+timestamp) : null;
  const dayData: DayData | null = date
    ? calendarData?.[date.getFullYear()]?.[date.getMonth()]?.[date.getDate()]
    : null;

  useEffect(() => {
    fetchCourses();
    fetchOptions();
    fetchCheckedMedications();
  }, [fetchCourses, fetchOptions, fetchCheckedMedications]);

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
