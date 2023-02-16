import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Icon } from "@iconify/react";
import { DatePicker } from "components/DatePicker";
import { useEvent, useStore } from "effector-react";

import { FORMATTED_DEFAULT_DATE } from "BW_const/common";
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
import { getDateFromString, getStringFromDate } from "BW_utils/date";

import { joinCn } from "utils/joinCn";

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

  const inputChangeHandler = (value: Date | null): void => {
    const stringDate = value
      ? getStringFromDate(value)
      : FORMATTED_DEFAULT_DATE;
    if (isNewWheel) {
      updateNewDate(stringDate);
    } else {
      updateEditedDate(stringDate);
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
        <DatePicker
          autoFocus
          onChange={(date) => inputChangeHandler(date)}
          selected={getDateFromString(isNewWheel ? newDate : editedDate || "")}
          onBlur={inputBlurHandler}
          classNames={["bw_date-input"]}
          wrapperClassNames={["bw_date-input-wrapper"]}
          month
          popperPlacement="bottom"
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
