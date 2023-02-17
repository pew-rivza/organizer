import React from "react";
import { useNavigate } from "react-router-dom";

import { Icon } from "@iconify/react";
import { useStore } from "effector-react";

import { Course } from "MT_components/Course";
import { $coursesFullInfo } from "MT_models/course";
import { CourseFullInfo } from "MT_types/stores";

import "./App.scss";

export const App: React.FC = () => {
  const coursesFullInfo = useStore<CourseFullInfo[]>($coursesFullInfo);
  const navigate = useNavigate();

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
