import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import { useEvent, useStore } from "effector-react";

import { Course } from "MT_components/Course";
import { $coursesFullInfo, fetchCoursesFx } from "MT_models/course";
import { fetchOptionsFx } from "MT_models/option";
import { CourseFullInfo, Course as CourseType, Option } from "MT_types/stores";

import "./App.scss";

export const App: React.FC = () => {
  const fetchCourses = useEvent<CourseType[]>(fetchCoursesFx);
  const coursesFullInfo = useStore<CourseFullInfo[]>($coursesFullInfo);
  const fetchOptions = useEvent<Option[]>(fetchOptionsFx);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    fetchOptions();
  }, [fetchCourses, fetchOptions]);

  return (
    <div data-testid="medication-taking" className="mt">
      <button
        className="mt_course-add icon-button"
        onClick={() => navigate("add")}
      >
        <Icon icon="material-symbols:add" />
      </button>

      {coursesFullInfo.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </div>
  );
};
