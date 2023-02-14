import { DayCellContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { useEvent } from "effector-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchCoursesFx } from "MT_models/course";
import { fetchOptionsFx } from "MT_models/option";
import { Course as CourseType, Option } from "MT_types/stores";

import { CalendarIcons } from "CR_components/CalendarIcons";
import { calendarConfig } from "CR_const/calendarConfig";

import "./App.scss";

export const App: React.FC = () => {
  const fetchCourses = useEvent<CourseType[]>(fetchCoursesFx);
  const fetchOptions = useEvent<Option[]>(fetchOptionsFx);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    fetchOptions();
  }, [fetchCourses, fetchOptions]);

  const DayCellContent: React.FC<DayCellContentArg> = (dayCell) => {
    const { date, isOther } = dayCell;

    return (
      <div className="cr_day">
        <div>{dayCell.dayNumberText}</div>
        <CalendarIcons date={date} disabled={isOther} />
      </div>
    );
  };

  return (
    <div data-testid="calendar" className="cr">
      <FullCalendar
        {...calendarConfig}
        dayCellContent={DayCellContent}
        select={(day) => {
          navigate(day.start.getTime().toString());
        }}
      />
    </div>
  );
};

// TODO: оформить страницу дня
// TODO: реализовать чек лекарств и чтобы они зачеркивались в тултипе
// TODO: сделать вывод тудушек колеса в верхнем тулбаре
