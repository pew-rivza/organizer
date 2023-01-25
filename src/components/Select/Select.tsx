import { Icon } from "@iconify/react";
import React from "react";
import ReactSelect from "react-select";

import { SelectProps } from "types/props";

import "./Select.scss";

export const Select: React.FC<SelectProps> = (props) => {
  return (
    <ReactSelect
      noOptionsMessage={() => "Ничего\u00A0не\u00A0найдено"}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "rgb(146, 166, 154)", // selected
          primary50: "rgba(146, 166, 154, 0.5)", // on active
          primary25: "rgba(146, 166, 154, 0.5)", // on hover
        },
      })}
      components={{
        DropdownIndicator: () => {
          return <Icon icon="material-symbols:arrow-back-ios-new" rotate={3} />;
        },
      }}
      className="select"
      {...props}
    />
  );
};
