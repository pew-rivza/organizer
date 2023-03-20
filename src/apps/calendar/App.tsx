import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import FullCalendar from "@fullcalendar/react";

import { WheelTodos } from "CR_components/WheelTodos";
import { calendarConfig } from "CR_const/calendarConfig";

import "./App.scss";

export const App: React.FC = () => {
  const navigate = useNavigate();
  const calendarRef = useRef<FullCalendar>(null);
  const [searchParams] = useSearchParams();
  const month: string = searchParams.get("month") || "";
  const year: string = searchParams.get("year") || "";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (calendarRef.current) {
      const date: Date = year && month ? new Date(+year, +month) : new Date();
      calendarRef.current.getApi().gotoDate(date);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-testid="calendar" className="cr">
      <FullCalendar
        {...calendarConfig}
        ref={calendarRef}
        dateClick={(info) => {
          if (!info.dayEl.className.includes("fc-day-other")) {
            navigate(info.date.getTime().toString());
          }
        }}
        customButtons={{
          wheel: {
            icon: "chevron-left",
            click: () => {
              setIsOpen((prevState) => !prevState);
            },
          },
        }}
      />
      <WheelTodos isOpen={isOpen} />
    </div>
  );
};
