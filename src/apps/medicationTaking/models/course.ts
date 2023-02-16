import { createEffect, createEvent, createStore } from "effector";
import { findObject } from "utils/objects";

import { API_FETCH_COURSES } from "MT_api/course";
import { EMPTY_COURSE } from "MT_const/common";
import { $medications, fetchMedicationsFx } from "MT_models/medication";
import {
  ChangedCourse,
  Course,
  CourseFullInfo,
  UpdateHandlerArgs,
} from "MT_types/stores";

// Effects
export const fetchCoursesFx = createEffect<void, Course[]>(async () => {
  const courses = await API_FETCH_COURSES();
  fetchMedicationsFx();
  return courses;
});

// Events
export const updateChangedCourse = createEvent<UpdateHandlerArgs>();
export const cancelChangedCourse = createEvent();
export const setChangedCourse = createEvent<ChangedCourse>();

// Stores
export const $courses = createStore<Course[]>([]).on(
  fetchCoursesFx.doneData,
  (_, courses) => courses,
);

export const $coursesFullInfo = createStore<CourseFullInfo[]>([])
  .on($courses, (prevState, courses) => {
    return courses.map((course, i): CourseFullInfo => {
      const startDate: Date = new Date(course.start);
      return {
        ...course,
        start: startDate,
        medications: prevState[i]?.medications || [],
      };
    });
  })
  .on($medications, (prevState, medications) => {
    const newState: CourseFullInfo[] = [...prevState].map((courseFullInfo) => ({
      ...courseFullInfo,
      medications: [],
    }));

    medications.forEach((medication) => {
      const course: CourseFullInfo =
        findObject<number, CourseFullInfo>(
          newState,
          "id",
          medication.MTCourseId,
        ) || ({} as CourseFullInfo);
      newState[newState.indexOf(course)].medications.push(medication);
    });
    return newState;
  });

export const $changedCourse = createStore<ChangedCourse>({ ...EMPTY_COURSE })
  .on(updateChangedCourse, (prevState, { field, value }) => {
    return {
      ...prevState,
      [field]: value,
    };
  })
  .on(cancelChangedCourse, () => {
    return { ...EMPTY_COURSE };
  })
  .on(setChangedCourse, (_, changedCourse) => changedCourse);
