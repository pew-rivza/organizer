import React, { useEffect } from "react";

import { useEvent } from "effector-react";

import { Date } from "BW_components/Date";
import { Todos } from "BW_components/Todos";
import { Wheel } from "BW_components/Wheel";
import { fetchAreasFx } from "BW_models/area";
import { fetchWheelsFx } from "BW_models/wheel";
import { Area, Wheel as WheelType } from "BW_types/stores";

import "./App.scss";

export const App: React.FC = () => {
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);
  const fetchAreas = useEvent<Area[]>(fetchAreasFx);

  useEffect(() => {
    fetchWheels();
    fetchAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-testid="balance-wheel" className="bw">
      rivza deploy test
      <Date />
      <div className="bw_container">
        <Wheel />
        <Todos />
      </div>
    </div>
  );
};
