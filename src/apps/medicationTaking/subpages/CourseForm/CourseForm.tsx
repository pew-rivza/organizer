import { useEvent, useStore } from "effector-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { findObject } from "utils/objects";

import {
  $coursesFullInfo,
  fetchCoursesFx,
  setChangedCourse,
} from "MT_models/course";
import { setChangedMedications } from "MT_models/medication";
import { fetchOptionsFx } from "MT_models/option";
import {
  ChangedCourse,
  ChangedMedication,
  CourseFullInfo,
  Course as CourseType,
  Option,
} from "MT_types/stores";
import { prepareMedicationToFrontend } from "MT_utils/prepare";

import { Course } from "./components/Course";
import { Toolbar } from "./components/Toolbar";

import "./CourseForm.scss";
import { Medications } from "./components/Medications";

export const CourseForm: React.FC = () => {
  const fetchOptions = useEvent<Option[]>(fetchOptionsFx);
  const fetchCourses = useEvent<CourseType[]>(fetchCoursesFx);
  const coursesFullInfo = useStore<CourseFullInfo[]>($coursesFullInfo);
  const { id } = useParams();

  useEffect(() => {
    fetchCourses();
    fetchOptions();
  }, [fetchCourses, fetchOptions]);

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
