import React from "react";

import { Date } from "BW_components/Date";
import { Todos } from "BW_components/Todos";
import { Wheel } from "BW_components/Wheel";

import "./App.scss";

export const App: React.FC = () => {
  return (
    <div data-testid="balance-wheel" className="bw">
      <Date />
      <div className="bw_container">
        <Wheel />
        <Todos />
      </div>
    </div>
  );
};
