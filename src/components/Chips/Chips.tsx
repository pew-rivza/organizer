import { Icon } from "@iconify/react";
import React from "react";

import { ChipsProps } from "types/props";

import "./Chips.scss";

export const Chips: React.FC<ChipsProps> = ({ children, icon, ...props }) => {
  return (
    <button type="button" className="chips" {...props}>
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );
};
