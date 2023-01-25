import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

import {
  isValidMedications,
  prepareMedication,
} from "apps/medicationTaking/utils/prepareMedications";
import { convertUTCDate } from "utils/date";

import { API_ADD_COURSE } from "MT_api/course";
import { API_ADD_MEDICATIONS } from "MT_api/medication";
import { $changedCourse } from "MT_models/course";
import { $changedMedications } from "MT_models/medication";
import { fetchOptionsFx } from "MT_models/option";
import { DBOption } from "MT_types/other";
import {
  Course as CourseType,
  Medication as MedicationType,
} from "MT_types/stores";

import { Course } from "./components/Course";

import "./CourseForm.scss";
import { Medications } from "./components/Medications";

export const CourseForm: React.FC = () => {
  const changedCourse = useStore<CourseType>($changedCourse);
  const changedMedications = useStore<MedicationType[]>($changedMedications);
  const fetchOptions = useEvent<DBOption[]>(fetchOptionsFx);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const addCourse = async () => {
    const { start, doctor, diagnosis } = changedCourse;
    if (
      start &&
      doctor &&
      diagnosis &&
      isValidMedications(changedMedications)
    ) {
      const medications = changedMedications.map(prepareMedication);
      const addedCourse = await API_ADD_COURSE({
        ...changedCourse,
        start: convertUTCDate(start),
      });

      await API_ADD_MEDICATIONS(medications, addedCourse.id || null);

      toast("Новый курс добавлен!", {
        toastId: 6,
        type: "success",
      });
    } else {
      toast("Заполните обязательные поля", {
        toastId: 7,
        type: "warning",
      });
    }
  };

  return (
    <React.Fragment>
      <button className="mt_form-save icon-button" onClick={addCourse}>
        <Icon icon="uil:save" />
      </button>
      <div className="mt_form">
        <Course />
        <Medications />
      </div>
    </React.Fragment>
  );
};
