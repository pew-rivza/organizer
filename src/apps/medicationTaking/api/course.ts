import { COURSE_URL } from "MT_const/api";
import { Course } from "MT_types/stores";

export const API_FETCH_COURSES = (): Promise<Course[]> =>
  fetch(COURSE_URL, {
    method: "GET",
    body: null,
    headers: {},
  }).then((response) => response.json());

export const API_ADD_COURSE = (course: Course): Promise<Course> =>
  fetch(COURSE_URL, {
    method: "POST",
    body: JSON.stringify({ ...course }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_UPDATE_COURSE = (course: Course): Promise<Course> =>
  fetch(COURSE_URL, {
    method: "PUT",
    body: JSON.stringify({ ...course }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());

export const API_DELETE_COURSE = (courseId: number | void): Promise<void> =>
  fetch(COURSE_URL, {
    method: "DELETE",
    body: JSON.stringify({ courseId }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
