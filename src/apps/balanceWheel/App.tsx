import React, { useEffect } from "react";
import { useEvent } from "effector-react";
import { fetchWheelsFx } from "BW_models/wheel";
import { fetchAreaValuesFx } from "BW_models/areaValue";
import { fetchAreasFx } from "BW_models/area";
import { Date } from "BW_components/Date";
import { Wheel } from "BW_components/Wheel";
import "./App.scss";

export function App() {
  const fetchWheels = useEvent(fetchWheelsFx);
  const fetchAreas = useEvent(fetchAreasFx);
  const fetchAreaValues = useEvent(fetchAreaValuesFx);

  useEffect(() => {
    Promise.all([fetchWheels(), fetchAreas()]).then(([wheels]) => {
      fetchAreaValues(wheels[wheels.length - 1]?.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="balance-wheel">
      <Date />
      <Wheel />
    </div>
  );
}
