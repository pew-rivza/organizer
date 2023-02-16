import React from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import { dateFormatter } from "const/common";

import "./Date.scss";

export const DayDate: React.FC<{ date: Date | null }> = ({ date }) => {
  const navigate = useNavigate();

  const nextDate: Date | null = date ? new Date(date?.getTime()) : null;
  nextDate?.setDate(nextDate?.getDate() + 1);
  const previousDate: Date | null = date ? new Date(date.getTime()) : null;
  previousDate?.setDate(previousDate?.getDate() - 1);

  const goTo = (timestamp: number | void): void => {
    navigate(`/calendar/${timestamp || ""}`);
  };

  return (
    <div className="cr_day_date">
      <Icon
        icon="material-symbols:arrow-back-ios-new"
        onClick={() => goTo(previousDate?.getTime())}
      />
      <div>{!!date && dateFormatter.format(date)}</div>
      <Icon
        icon="material-symbols:arrow-forward-ios"
        onClick={() => goTo(nextDate?.getTime())}
      />
    </div>
  );
};
