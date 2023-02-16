import React from "react";

import { dateFormatter } from "const/common";
import { useStore } from "effector-react";
import { getValuesByField } from "utils/objects";

import { Medications } from "MT_components/Medications";
import { Toolbar } from "MT_components/Toolbar";
import { $options } from "MT_models/option";
import { CourseProps } from "MT_types/props";
import { GroupedOptions, Medication } from "MT_types/stores";
import { getCourseEndsWithoutPeriod } from "MT_utils/period";

import "./Course.scss";

export const Course: React.FC<CourseProps> = ({ course }) => {
  const groupedOptions = useStore<GroupedOptions>($options);
  const periodStarts: number[] = getValuesByField<Medication, Date>(
    course.medications,
    "periodDateStart",
  ).map((date) => date.getTime());

  const courseStart: Date = new Date(
    Math.min(course.start?.getTime() || 0, ...periodStarts),
  );

  const courseEndsWithoutPeriod: number[] = (
    course.start
      ? getCourseEndsWithoutPeriod(
          course.start,
          course.medications,
          groupedOptions.period,
        )
      : []
  ).map((date) => date.getTime());

  const withoutPeriodCourseEnd: Date = new Date(
    Math.max(...courseEndsWithoutPeriod),
  );

  const courseEndsWithPeriod: number[] = getValuesByField<Medication, Date>(
    course.medications,
    "periodDateEnd",
  ).map((date) => date.getTime());

  const maxCourseEnd: number = Math.max(
    ...courseEndsWithoutPeriod,
    ...courseEndsWithPeriod,
    0,
  );

  const courseEnd: Date | null = maxCourseEnd ? new Date(maxCourseEnd) : null;

  return (
    <React.Fragment>
      <div className="mt_course-header">
        <div className="mt_course-period">
          {dateFormatter.format(courseStart)} –{" "}
          {courseEnd ? dateFormatter.format(courseEnd) : "🕑"}
          {!!course.medications.length && course.id && (
            <Toolbar courseId={course.id} />
          )}
        </div>

        <div className="mt_course-subheader">
          {course.doctor}: {course.diagnosis}
        </div>
      </div>
      <Medications
        medications={course.medications}
        courseStart={course.start}
        withoutPeriodCourseEnd={withoutPeriodCourseEnd}
      />
    </React.Fragment>
  );
};
