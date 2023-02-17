import React from "react";
import { useNavigate } from "react-router-dom";

import { DayCellContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";

import { CalendarIcons } from "CR_components/CalendarIcons";
import { calendarConfig } from "CR_const/calendarConfig";

import "./App.scss";

export const App: React.FC = () => {
  const navigate = useNavigate();

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
