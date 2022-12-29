import React, {useEffect } from "react";
import {useEvent } from "effector-react";
import { fetchWheelsFx} from "BW_models/wheel";
import {fetchAreasFx} from "BW_models/area";
import { Date } from "BW_components/Date";
import { Wheel } from "BW_components/Wheel";
import { Todos } from "BW_components/Todos";
import {Area, Wheel as WheelType} from "BW_types";
import "./App.scss";

export function App() {
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);
  const fetchAreas = useEvent<Area[]>(fetchAreasFx);

  useEffect(() => {
    fetchWheels();
    fetchAreas();
  }, [fetchAreas, fetchWheels]);

  return (
    <div className="balance-wheel">
      <Date />
      <div className="bw_container">
        <Wheel />
        <Todos />
      </div>
    </div>
  );
}
