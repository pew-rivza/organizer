import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DayCellContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import { useEvent } from "effector-react";

import { fetchCoursesFx } from "MT_models/course";
import { fetchOptionsFx } from "MT_models/option";
import { Course as CourseType, Option } from "MT_types/stores";

import { CalendarIcons } from "CR_components/CalendarIcons";
import { calendarConfig } from "CR_const/calendarConfig";
import { fetchCheckedMedicationsFx } from "CR_models/medication";
import { CheckedMedications } from "CR_types/stores";

import "./App.scss";

export const App: React.FC = () => {
  const fetchCourses = useEvent<CourseType[]>(fetchCoursesFx);
  const fetchOptions = useEvent<Option[]>(fetchOptionsFx);
  const fetchCheckedMedications = useEvent<CheckedMedications[]>(
    fetchCheckedMedicationsFx,
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    fetchOptions();
    fetchCheckedMedications();
  }, [fetchCheckedMedications, fetchCourses, fetchOptions]);

  const DayCellContent: React.FC<DayCellContentArg> = (dayCell) => {
    const { date, isOther } = dayCell;

    return (
      <div className="cr_day_cell">
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

// TODO: вынести вызов фетчей в общее для всего приложения место
// TODO: разобраться переходами на страницы дня на активных и дизейблед днях
// TODO: при удалении медикейшана удалять его чеки в календаре, и при удалении курса тоже
// TODO: сделать кнопку назад
// TODO: сделать вывод тудушек колеса в верхнем тулбаре
// TODO: сделать адаптив
// TODO: настроить проверку import/order в eslint
