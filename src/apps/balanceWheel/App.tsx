import React, { useEffect } from "react";
import { useEvent } from "effector-react";
import { fetchWheelsFx } from "BW_models/wheel";
import { fetchAreaValuesFx } from "BW_models/areaValue";
import { fetchAreasFx } from "BW_models/area";
import { Date } from "BW_components/Date";
import { Wheel } from "BW_components/Wheel";
import { Todos } from "BW_components/Todos";
import { Area, AreaValue, Wheel as WheelType } from "BW_types";
import "./App.scss";
import { fetchTodosFx } from "BW_models/todo";

export function App() {
  const fetchWheels = useEvent<WheelType[]>(fetchWheelsFx);
  const fetchAreas = useEvent<Area[]>(fetchAreasFx);
  const fetchAreaValues = useEvent<number | void, AreaValue[]>(
    fetchAreaValuesFx
  );
  const fetchTodos = useEvent<number | void, any>(fetchTodosFx);

  useEffect(() => {
    Promise.all([fetchWheels(), fetchAreas()]).then(async ([wheels]) => {
      const lastWheelId: number | void = wheels[wheels.length - 1]?.id;
      await fetchAreaValues(lastWheelId);
      await fetchTodos(lastWheelId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="balance-wheel">
      <Date />
      <Wheel />
      <Todos />
    </div>
  );
}
