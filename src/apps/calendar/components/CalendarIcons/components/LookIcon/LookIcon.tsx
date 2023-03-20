import React from "react";

import { LookIconProps } from "CR_types/props";

import { IconTemplate } from "../IconTemplate";

import "./LookIcon.scss";

export const LookIcon: React.FC<LookIconProps> = ({ id, disabled, look }) => {
  return (
    <IconTemplate
      disabled={disabled}
      prefix="look"
      id={id}
      icon="mdi:wardrobe-outline"
    >
      <img className="cr_day_icons-look" alt="" src={look.image} />
    </IconTemplate>
  );
};
