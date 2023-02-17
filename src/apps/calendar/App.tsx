import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { DayCellContentArg } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";

import { CalendarIcons } from "CR_components/CalendarIcons";
import { calendarConfig } from "CR_const/calendarConfig";

import "./App.scss";

export const App: React.FC = () => {
  const navigate = useNavigate();
  const calendarRef = useRef<FullCalendar>(null);
  const [searchParams] = useSearchParams();
  const month: string = searchParams.get("month") || "";
  const year: string = searchParams.get("year") || "";

  const DayCellContent: React.FC<DayCellContentArg> = (dayCell) => {
    const { date, isOther } = dayCell;

    return (
      <div className="cr_day_cell">
        <div>{dayCell.dayNumberText}</div>
        <CalendarIcons date={date} disabled={isOther} />
      </div>
    );
  };

  useEffect(() => {
    if (calendarRef.current) {
      const date = year && month ? new Date(+year, +month) : new Date();
      calendarRef.current.getApi().gotoDate(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-testid="calendar" className="cr">
      <FullCalendar
        {...calendarConfig}
        ref={calendarRef}
        dayCellContent={DayCellContent}
        dateClick={(info) => {
          if (!info.dayEl.className.includes("fc-day-other")) {
            navigate(info.date.getTime().toString());
          }
        }}
      />
    </div>
  );
};

// TODO: сделать вывод тудушек колеса в верхнем тулбаре
// TODO: сделать адаптив
// TODO: настроить проверку import/order в eslint
// TODO: разобраться с преттиером опять на примере файла src/apps/calendar/subpages/Day/components/DayDate/DayDate.tsx
