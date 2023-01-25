import React, { ButtonHTMLAttributes } from "react";

import "./Chips.scss";

export const Chips: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props,
) => {
  return <button type="button" className="chips" {...props} />;
};
