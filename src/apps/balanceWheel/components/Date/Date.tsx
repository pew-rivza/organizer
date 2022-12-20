import React from 'react';
import { useEvent, useStore } from "effector-react";
import { joinCn } from 'utils/joinCn';
import { $currentWheel, $wheels, updateCurrentWheel } from "BW_models/wheel";
import { fetchAreaValuesFx } from "BW_models/areaValue";
import { AreaValue, Wheel } from 'BW_types';
import "./Date.scss";

export const Date: React.FC<{}> = () => {
  const wheels: Wheel[] = useStore($wheels);
  const currentWheel: Wheel = useStore($currentWheel);
  const currentWheelIndex: number = wheels.indexOf(currentWheel);
  const fetchAreaValues: (wheelId?: number) => Promise<AreaValue[]> = useEvent(fetchAreaValuesFx);

  const getWheel = async (wheel: Wheel, isDisabled: boolean): Promise<void> => {
    if (isDisabled) return;
    await fetchAreaValues(wheel.id);
    updateCurrentWheel(wheel);
  }

  const prevWheelCn: string = joinCn(
    "bw_date-arrow",
    "bw_date-arrow-previous",
    currentWheelIndex === 0 && "disabled"
  );
  const nextWheelCn: string = joinCn(
    "bw_date-arrow",
    "bw_date-arrow-next",
    currentWheelIndex === wheels.length - 1 && "disabled");

  return (
    <div className="bw_date">
      <div
        className={prevWheelCn}
        onClick={() => getWheel(
          wheels[currentWheelIndex - 1],
          currentWheelIndex === 0
        )}
      />
        <div className="bw_date-text">{currentWheel.date || "..."}</div>
      <div
        className={nextWheelCn}
        onClick={() => getWheel(
          wheels[currentWheelIndex + 1],
          currentWheelIndex === wheels.length - 1
        )}
      />
    </div>
  )
};
