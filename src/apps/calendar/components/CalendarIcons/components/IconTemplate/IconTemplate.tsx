import React from "react";
import { Tooltip } from "react-tooltip";

import { Icon } from "@iconify/react";

import { joinCn } from "utils/joinCn";

import { IconTemplateProps } from "CR_types/props";

export const IconTemplate: React.FC<IconTemplateProps> = ({
  id,
  disabled,
  prefix,
  icon,
  children,
}) => {
  const iconCn = joinCn(disabled && "cr_day_icons-disabled");

  return (
    <div className={`cr_day_icons-${prefix}`}>
      <div id={`${prefix}-${id}`}>
        <Icon icon={icon} className={iconCn} />
      </div>

      {!disabled && (
        <Tooltip anchorId={`${prefix}-${id}`} clickable>
          {children}
        </Tooltip>
      )}
    </div>
  );
};
