import React from "react";

import { Icon } from "@iconify/react";

import { TIMES_OF_DAY_ICONS_COMPLIANCE } from "CR_const/common";
import { MedicationHeaderDayProps } from "CR_types/props";

import "./Header.scss";

export const Header: React.FC<MedicationHeaderDayProps> = ({ timesOfDay }) => {
  return (
    <div className="cr_day_medications-header">
      <Icon
        icon={TIMES_OF_DAY_ICONS_COMPLIANCE[timesOfDay]}
        className="cr_day_medications-time-icon"
      />
      {timesOfDay[0].toUpperCase()}
      {timesOfDay.slice(1)}
    </div>
  );
};
