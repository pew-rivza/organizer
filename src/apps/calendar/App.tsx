import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useEvent } from "effector-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchCoursesFx } from "MT_models/course";
import { fetchOptionsFx } from "MT_models/option";
import { Course as CourseType, Option } from "MT_types/stores";

import { CalendarIcons } from "CR_components/CalendarIcons";

import "./App.scss";

export const App: React.FC = () => {
  const fetchCourses = useEvent<CourseType[]>(fetchCoursesFx);
  const fetchOptions = useEvent<Option[]>(fetchOptionsFx);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    fetchOptions();
  }, [fetchCourses, fetchOptions]);

  return (
    <div data-testid="calendar" className="cr">
      <FullCalendar
        plugins={[interactionPlugin, dayGridPlugin]}
        initialView="dayGridMonth"
        locale="ru"
        firstDay={1}
        dayMaxEventRows={4}
        dayCellContent={(dayCell) => {
          const { date, isOther } = dayCell;
          return (
            <div className="cr_day">
              <div>{dayCell.dayNumberText}</div>
              <CalendarIcons date={date} disabled={isOther} />
            </div>
          );
        }}
        headerToolbar={{
          start: "",
          center: "prev title next",
          end: "",
        }}
        titleFormat={{ year: "numeric", month: "numeric" }}
        selectable={true}
        select={(day) => {
          navigate(day.start.getTime().toString());
        }}
      />
    </div>
  );
};
