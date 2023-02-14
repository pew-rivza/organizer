import { Icon } from "@iconify/react";
import React from "react";
import { Tooltip } from "react-tooltip";

import { IconTemplateProps } from "CR_types/props";

import "./IconTemplate.scss";

export const IconTemplate: React.FC<IconTemplateProps> = ({
  id,
  disabled,
  prefix,
  icon,
  children,
}) => {
  return (
    <div className={`cr_day_icons-${prefix}`}>
      <div id={`${prefix}-${id}`}>
        <Icon icon={icon} />
      </div>

      {!disabled && <Tooltip anchorId={`${prefix}-${id}`}>{children}</Tooltip>}
    </div>
  );
};
