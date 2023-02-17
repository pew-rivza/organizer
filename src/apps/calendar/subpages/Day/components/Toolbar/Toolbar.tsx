import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Icon } from "@iconify/react";

import { DayDate } from "CR_subpages/Day/components/DayDate";
import { DayParams } from "CR_types/other";
import { DayToolbarProps } from "CR_types/props";

import "./Toolbar.scss";

export const Toolbar: React.FC<DayToolbarProps> = ({ date }) => {
  const navigate = useNavigate();
  const { timestamp } = useParams() as DayParams;
  const currentDate: Date = new Date(+timestamp);

  return (
    <div className="cr_day_toolbar">
      <Icon
        icon="material-symbols:arrow-back-ios-new"
        onClick={() => {
          navigate(
            `/calendar/?month=${currentDate.getMonth()}&year=${currentDate.getFullYear()}`,
          );
        }}
      />
      <DayDate date={date} />
      <Icon
        icon="fluent-mdl2:goto-today"
        onClick={() => {
          navigate(`/calendar/${new Date().getTime()}`);
        }}
      />
    </div>
  );
};
