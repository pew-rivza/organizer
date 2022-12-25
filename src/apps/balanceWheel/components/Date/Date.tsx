import React from "react";
import { useEvent, useStore } from "effector-react";
import { joinCn } from "utils/joinCn";
import { $wheel, $wheels, updateWheel } from "BW_models/wheel";
import {
  cancelEditedAreaValues,
  editModeOff,
  fetchAreaValuesFx,
} from "BW_models/areaValue";
import { AreaValue, Todo, Wheel } from "BW_types";
import "./Date.scss";
import { fetchTodosFx } from "BW_models/todo";

export const Date: React.FC<{}> = () => {
  const wheels = useStore<Wheel[]>($wheels);
  const wheel = useStore<Wheel>($wheel);
  const wheelIndex: number = wheels.indexOf(wheel);
  const fetchAreaValues = useEvent<number | void, AreaValue[]>(
    fetchAreaValuesFx
  );
  const fetchTodos = useEvent<number | void, Todo[]>(fetchTodosFx);

  const switchWheelTo = async (
    wheel: Wheel,
    isDisabled: boolean
  ): Promise<void> => {
    if (isDisabled) return;
    await fetchAreaValues(wheel.id);
    await fetchTodos(wheel.id);
    updateWheel(wheel);
    cancelEditedAreaValues();
    editModeOff();
  };

  const prevWheelCn: string = joinCn(
    "bw_date-arrow",
    "bw_date-arrow-previous",
    wheelIndex === 0 && "disabled"
  );
  const nextWheelCn: string = joinCn(
    "bw_date-arrow",
    "bw_date-arrow-next",
    wheelIndex === wheels.length - 1 && "disabled"
  );

  return (
    <div className="bw_date">
      <div
        className={prevWheelCn}
        onClick={() => switchWheelTo(wheels[wheelIndex - 1], wheelIndex === 0)}
      />
      <div className="bw_date-text">{wheel.date || "..."}</div>
      <div
        className={nextWheelCn}
        onClick={() =>
          switchWheelTo(
            wheels[wheelIndex + 1],
            wheelIndex === wheels.length - 1
          )
        }
      />
    </div>
  );
};
