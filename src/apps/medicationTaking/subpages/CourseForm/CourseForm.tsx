import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "effector-react";
import { findObject } from "utils/objects";

import { $coursesFullInfo, setChangedCourse } from "MT_models/course";
import { setChangedMedications } from "MT_models/medication";
import {
  ChangedCourse,
  ChangedMedication,
  CourseFullInfo,
} from "MT_types/stores";
import { prepareMedicationToFrontend } from "MT_utils/prepare";

import { Course } from "./components/Course";
import { Medications } from "./components/Medications";
import { Toolbar } from "./components/Toolbar";

import "./CourseForm.scss";

export const CourseForm: React.FC = () => {
  const coursesFullInfo = useStore<CourseFullInfo[]>($coursesFullInfo);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const editedCourse = findObject<number, CourseFullInfo>(
        coursesFullInfo,
        "id",
        +id,
      );
      const {
        start = null,
        doctor = "",
        diagnosis = "",
      } = (editedCourse || {}) as ChangedCourse;
      const preparedMedications: ChangedMedication[] = (
        editedCourse?.medications || []
      ).map(prepareMedicationToFrontend);

      setChangedCourse({
        id: +id,
        start: start ? new Date(start) : null,
        doctor,
        diagnosis,
      });

      setChangedMedications(preparedMedications);
    }
  }, [coursesFullInfo, id]);

  return (
    <React.Fragment>
      <Toolbar />
      <div className="mt_form">
        <Course />
        <Medications />
      </div>
    </React.Fragment>
  );
};
