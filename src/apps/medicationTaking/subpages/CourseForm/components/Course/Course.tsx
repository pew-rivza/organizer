import { useStore } from "effector-react";
import React from "react";

import { DatePicker } from "components/DatePicker";

import { $changedCourse, updateChangedCourse } from "MT_models/course";
import { Course as CourseType } from "MT_types/stores";

import { ItemTemplate } from "./../Item/ItemTemplate";

import "./Course.scss";

export const Course: React.FC = () => {
  const { start, doctor, diagnosis } = useStore<CourseType>($changedCourse);

  function changeHandler<ValueType>(field: string, value: ValueType) {
    updateChangedCourse({ field, value });
  }

  return (
    <fieldset className="mt_form_course">
      <legend>Данные о курсе</legend>
      <ItemTemplate>
        <ItemTemplate.Label required>Начало&nbsp;курса</ItemTemplate.Label>
        <DatePicker
          selected={start}
          onChange={(date) => changeHandler<Date | null>("start", date)}
        />
      </ItemTemplate>
      <ItemTemplate>
        <ItemTemplate.Label required>Врач</ItemTemplate.Label>
        <input
          type="text"
          value={doctor}
          onChange={(event) =>
            changeHandler<string>("doctor", event.target.value)
          }
        />
      </ItemTemplate>
      <ItemTemplate>
        <ItemTemplate.Label required>Диагноз</ItemTemplate.Label>
        <input
          type="text"
          value={diagnosis}
          onChange={(event) =>
            changeHandler<string>("diagnosis", event.target.value)
          }
        />
      </ItemTemplate>
    </fieldset>
  );
};
