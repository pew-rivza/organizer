import React from "react";
import { useEvent, useStore } from "effector-react";
import MaskedInput from 'react-text-mask';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { joinCn } from "utils/joinCn";
import {$isNewWheel, $wheel, $wheels, updateWheel, updateIsNewWheel, $newDate, updateNewDate} from "BW_models/wheel";
import {
  cancelEditedAreaValues,
  editModeOff,
  fetchAreaValuesFx,
  updateAreaValues,
  updatePreviousAreaValues,
} from "BW_models/areaValue";
import { AreaValue, Todo, Wheel } from "BW_types";
import "./Date.scss";
import { fetchTodosFx } from "BW_models/todo";
import {Icon} from "@iconify/react";

export const Date: React.FC = () => {
  const wheels = useStore<Wheel[]>($wheels);
  const wheel = useStore<Wheel>($wheel);
  const wheelIndex: number = wheels.indexOf(wheel);
  const isFirstWheel: boolean = wheelIndex === 0;
  const isLastWheel: boolean = wheelIndex === wheels.length - 1;
  const isNewWheel = useStore<boolean>($isNewWheel);
  const newDate = useStore<string>($newDate);
  const fetchAreaValues = useEvent<number | void, AreaValue[]>(
    fetchAreaValuesFx
  );
  const fetchTodos = useEvent<number | void, Todo[]>(fetchTodosFx);
  const [wheelYear, wheelMonth]: string[] = wheel.date?.split(".") || [];

  const switchWheelTo = async (wheel: Wheel, prevWheel?: Wheel): Promise<void> => {
    const areaValues = await fetchAreaValues(wheel.id);
    const previousAreaValues = await fetchAreaValues(prevWheel?.id);
    await fetchTodos(wheel.id);
    updateIsNewWheel(false);
    updateWheel(wheel);
    updateAreaValues(areaValues);
    updatePreviousAreaValues(previousAreaValues);
    cancelEditedAreaValues();
    editModeOff();
  };

  const switchToNewWheel = (): void => {
    updateIsNewWheel(true);
    cancelEditedAreaValues();
    editModeOff();
  }

  const prevWheelCn: string = joinCn(
    "bw_date-icon",
    (isFirstWheel || !wheel.date) && "disabled"
  );
  const nextWheelCn: string = joinCn(
    "bw_date-icon",
    (isNewWheel || !wheel.date) && "disabled"
  );

  return (
    <div className="bw_date">
      <Icon
        icon="material-symbols:arrow-back-ios-new"
        onClick={() => !isFirstWheel && switchWheelTo(
          isNewWheel ? wheels[wheelIndex] : wheels[wheelIndex - 1],
          isNewWheel ? wheels[wheelIndex - 1] : wheels[wheelIndex - 2]
        )}
        className={prevWheelCn}
      />
      {
        isNewWheel ? (
          <MaskedInput
            type="text"
            autoFocus
            placeholder={newDate}
            value={newDate}
            guide={false}
            mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
            onChange={(event) => updateNewDate(event.target.value)}
            className="bw_date-input"
          />
        ) : (
          <div className="bw_date-text">
            {
              !!wheel.date ? `${wheelMonth}.${wheelYear}` : <Skeleton />
            }
          </div>
        )
      }
      <Icon
        icon="material-symbols:arrow-forward-ios"
        onClick={() => !isNewWheel && (isLastWheel
          ? switchToNewWheel()
          : switchWheelTo(wheels[wheelIndex + 1], wheels[wheelIndex])
        )}
        className={nextWheelCn}
      />
    </div>
  );
};
