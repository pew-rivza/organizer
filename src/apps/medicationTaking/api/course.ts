import { COURSE_URL } from "MT_const/api";
import { Course } from "MT_types/stores";

export const API_ADD_COURSE = (course: Course): Promise<Course> =>
  fetch(COURSE_URL, {
    method: "POST",
    body: JSON.stringify({ ...course }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
