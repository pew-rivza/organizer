import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MaskedInput from "react-text-mask";

import { joinCn } from "utils/joinCn";

import {
  $editedAreaValues,
  cancelEditedAreaValues,
  fetchAreaValuesFx,
  updateAreaValues,
  updatePreviousAreaValues,
} from "BW_models/areaValue";
import { editModeOff, editModeOn } from "BW_models/common";
import { fetchTodosFx } from "BW_models/todo";
import {
  $editedDate,
  $isNewWheel,
  $newDate,
  $wheel,
  $wheels,
  cancelEditedDate,
  updateEditedDate,
  updateIsNewWheel,
  updateNewDate,
  updateWheel,
} from "BW_models/wheel";
import { AreaValue, EditedAreaValues, Todo, Wheel } from "BW_types/stores";

import "./Date.scss";

export const Date: React.FC = () => {
  const wheels = useStore<Wheel[]>($wheels);
  const wheel = useStore<Wheel>($wheel);
  const wheelIndex: number = wheels.indexOf(wheel);
  const isFirstWheel: boolean = wheelIndex === 0;
  const isLastWheel: boolean = wheelIndex === wheels.length - 1;
  const isNewWheel = useStore<boolean>($isNewWheel);
  const newDate = useStore<string>($newDate);
  const editedDate = useStore<string | false>($editedDate);
  const editedAreaValues = useStore<EditedAreaValues>($editedAreaValues);
  const fetchAreaValues = useEvent<number | void, AreaValue[]>(
    fetchAreaValuesFx,
  );
  const fetchTodos = useEvent<number | void, Todo[]>(fetchTodosFx);
  const [wheelYear, wheelMonth]: string[] = wheel.date?.split(".") || [];
  const formattedDate: string = `${wheelMonth}.${wheelYear}`;

  const switchWheelTo = async (
    wheel: Wheel,
    prevWheel?: Wheel,
  ): Promise<void> => {
    const areaValues = await fetchAreaValues(wheel.id);
    const previousAreaValues = await fetchAreaValues(prevWheel?.id);
    await fetchTodos(wheel.id);
    updateIsNewWheel(false);
    updateWheel(wheel);
    updateAreaValues(areaValues);
    updatePreviousAreaValues(previousAreaValues);
    cancelEditedAreaValues();
    cancelEditedDate();
    editModeOff();
  };

  const switchToNewWheel = (): void => {
    updateIsNewWheel(true);
    cancelEditedAreaValues();
    cancelEditedDate();
    editModeOff();
  };

  const inputChangeHandler = (value: string): void => {
    if (isNewWheel) {
      updateNewDate(value);
    } else {
      updateEditedDate(value);
      editModeOn();
    }
  };

  const inputBlurHandler = (): void => {
    if (editedDate === formattedDate) {
      cancelEditedDate();
      if (!Object.keys(editedAreaValues).length) {
        editModeOff();
      }
    }
  };

  const dateClickHandler = (): void => {
    updateEditedDate(formattedDate);
  };

  const prevWheelCn: string = joinCn(
    "bw_date-icon",
    isFirstWheel || !wheel.date ? "disabled" : "",
  );
  const nextWheelCn: string = joinCn(
    "bw_date-icon",
    isNewWheel || !wheel.date ? "disabled" : "",
  );

  return (
    <div className="bw_date">
      <Icon
        icon="material-symbols:arrow-back-ios-new"
        onClick={() =>
          !isFirstWheel &&
          switchWheelTo(
            isNewWheel ? wheels[wheelIndex] : wheels[wheelIndex - 1],
            isNewWheel ? wheels[wheelIndex - 1] : wheels[wheelIndex - 2],
          )
        }
        className={prevWheelCn}
      />
      {isNewWheel || typeof editedDate === "string" ? (
        <MaskedInput
          type="text"
          autoFocus
          placeholder={newDate}
          value={isNewWheel ? newDate : editedDate || ""}
          guide={false}
          mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
          onBlur={inputBlurHandler}
          onChange={(event) => inputChangeHandler(event.target.value)}
          className="bw_date-input"
        />
      ) : (
        <div className="bw_date-text" onClick={dateClickHandler}>
          {!!wheel.date ? formattedDate : <Skeleton />}
        </div>
      )}
      <Icon
        icon="material-symbols:arrow-forward-ios"
        onClick={() =>
          !isNewWheel &&
          (isLastWheel
            ? switchToNewWheel()
            : switchWheelTo(wheels[wheelIndex + 1], wheels[wheelIndex]))
        }
        className={nextWheelCn}
      />
    </div>
  );
};
