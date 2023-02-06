import { Icon } from "@iconify/react";
import { useEvent } from "effector-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { API_DELETE_COURSE } from "MT_api/course";
import { fetchCoursesFx } from "MT_models/course";
import { ToolbarProps } from "MT_types/props";
import { Course as CourseType } from "MT_types/stores";

import "./Toolbar.scss";

export const Toolbar: React.FC<ToolbarProps> = ({ courseId }) => {
  const navigate = useNavigate();
  const fetchCourses = useEvent<CourseType[]>(fetchCoursesFx);

  const deleteCourse = async (): Promise<void> => {
    await API_DELETE_COURSE(courseId);
    toast("Курс удален!", {
      toastId: 8,
      type: "success",
    });
    fetchCourses();
  };

  return (
    <div className="mt_course_toolbar">
      <Icon
        icon="mi:edit"
        className="mt_course_toolbar-edit"
        onClick={() => {
          navigate(`edit/${courseId}`);
        }}
      />
      <Icon
        icon="ri:delete-bin-line"
        className="mt_course_toolbar-delete"
        onClick={deleteCourse}
      />
    </div>
  );
};
