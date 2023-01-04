import { useEvent } from "effector-react";
import React, { useEffect } from "react";

import { Date } from "BW_components/Date";
import { Todos } from "BW_components/Todos";
import { Wheel } from "BW_components/Wheel";
import { fetchAreasFx } from "BW_models/area";
import { fetchWheelsFx } from "BW_models/wheel";
import { Area, Wheel as WheelType } from "BW_types/stores";

import "./App.scss";

export function App() {
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);
  const fetchAreas = useEvent<Area[]>(fetchAreasFx);

  useEffect(() => {
    fetchWheels();
    fetchAreas();
  }, [fetchAreas, fetchWheels]);

  return (
    <div data-testid="balance-wheel" className="bw">
      <Date />
      <div className="bw_container">
        <Wheel />
        <Todos />
      </div>
    </div>
  );
}
