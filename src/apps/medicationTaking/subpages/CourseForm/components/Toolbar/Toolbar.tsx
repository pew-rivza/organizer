import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { convertUTCDate } from "utils/date";

import { API_ADD_COURSE, API_UPDATE_COURSE } from "MT_api/course";
import { API_ADD_MEDICATIONS, API_UPDATE_MEDICATIONS } from "MT_api/medication";
import {
  $changedCourse,
  cancelChangedCourse,
  fetchCoursesFx,
} from "MT_models/course";
import {
  $changedMedications,
  cancelChangedMedications,
} from "MT_models/medication";
import { ChangedCourse, ChangedMedication, Course } from "MT_types/stores";
import { prepareMedicationForBackend } from "MT_utils/prepare";
import { isValidCourse, isValidMedications } from "MT_utils/validation";

import { fetchCheckedMedicationsFx } from "CR_models/medication";
import { CheckedMedications } from "CR_types/stores";

import "./Toolbar.scss";

export const Toolbar: React.FC = () => {
  const changedCourse = useStore<ChangedCourse>($changedCourse);
  const changedMedications = useStore<ChangedMedication[]>($changedMedications);
  const fetchCourses = useEvent<Course[]>(fetchCoursesFx);
  const fetchCheckedMedications = useEvent<CheckedMedications[]>(
    fetchCheckedMedicationsFx,
  );
  const navigate = useNavigate();

  const changeCourse = async (): Promise<void> => {
    const { start, id } = changedCourse;

    if (
      isValidCourse(changedCourse) &&
      isValidMedications(changedMedications)
    ) {
      const medications = changedMedications.map(prepareMedicationForBackend);

      if (id) {
        await API_UPDATE_COURSE({
          ...changedCourse,
          start: convertUTCDate(start),
        });

        await API_UPDATE_MEDICATIONS(medications, id || null);
      } else {
        const addedCourse = await API_ADD_COURSE({
          ...changedCourse,
          start: convertUTCDate(start),
        });

        await API_ADD_MEDICATIONS(medications, addedCourse.id || null);
      }

      fetchCourses();
      fetchCheckedMedications();
      navigate(-1);

      toast(id ? "Курс отредактирован!" : "Новый курс добавлен!", {
        toastId: 6,
        type: "success",
        onClose: () => {
          cancelChangedCourse();
          cancelChangedMedications();
        },
      });
    } else {
      toast("Заполните обязательные поля", {
        toastId: 7,
        type: "warning",
      });
    }
  };

  const goBack = () => {
    navigate(-1);
    cancelChangedCourse();
    cancelChangedMedications();
  };

  return (
    <div className="mt_form_toolbar">
      <Icon
        icon="material-symbols:arrow-back-ios-new"
        onClick={goBack}
        className={"mt_form_toolbar-back"}
      />
      <button
        className="mt_form_toolbar-save icon-button"
        onClick={changeCourse}
      >
        <Icon icon="uil:save" />
      </button>
    </div>
  );
};
