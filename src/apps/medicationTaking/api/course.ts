import { COURSE_URL } from "MT_const/api";
import { ChangedCourse, Course } from "MT_types/stores";

export const API_FETCH_COURSES = (): Promise<Course[]> =>
  fetch(COURSE_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_ADD_COURSE = (course: ChangedCourse): Promise<Course> =>
  fetch(COURSE_URL, {
    method: "POST",
    body: JSON.stringify({ ...course }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
