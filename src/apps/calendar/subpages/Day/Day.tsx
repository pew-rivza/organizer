import { useEvent, useStore } from "effector-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { dateFormatter } from "const/common";

import { fetchCoursesFx } from "MT_models/course";
import { $options, fetchOptionsFx } from "MT_models/option";
import { MedicationInfo } from "MT_types/other";
import { Course as CourseType, GroupedOptions, Option } from "MT_types/stores";

import { ALL_DAY } from "CR_const/common";
import { $calendarData } from "CR_models/calendar";
import { DayData } from "CR_types/other";
import { CalendarData } from "CR_types/stores";
import { getGroupedMedications } from "CR_utils/medication";

import "./Day.scss";

export const Day: React.FC = () => {
  const calendarData = useStore<CalendarData>($calendarData);
  const { timestamp } = useParams();
  const date: Date | null = timestamp ? new Date(+timestamp) : null;
  const dayData: DayData | null = date
    ? calendarData?.[date.getFullYear()]?.[date.getMonth()]?.[date.getDate()]
    : null;
  const groupedOptions = useStore<GroupedOptions>($options);
  const groupedMedications = getGroupedMedications(
    dayData?.medications || [],
    groupedOptions,
  );
  const fetchCourses = useEvent<CourseType[]>(fetchCoursesFx);
  const fetchOptions = useEvent<Option[]>(fetchOptionsFx);

  useEffect(() => {
    fetchCourses();
    fetchOptions();
  }, [fetchCourses, fetchOptions]);

  return (
    <div>
      <div>Дата: {!!date && dateFormatter.format(date)}</div>
      <div>
        {!!dayData?.medications &&
          Object.keys(groupedMedications).map((timesOfDay) => {
            return (
              <React.Fragment key={timesOfDay}>
                {!!groupedMedications[timesOfDay].length && (
                  <div>{timesOfDay}</div>
                )}
                {groupedMedications[timesOfDay].map(
                  (medication: MedicationInfo) => {
                    const {
                      id,
                      name,
                      count,
                      nominativeCountMeasure,
                      routeOfAdministration,
                      frequency,
                      times,
                      inBeforePreposition,
                      inBefore,
                      mealTime,
                      comment,
                    } = medication;

                    return (
                      <div
                        key={`${timesOfDay}-${id}`}
                        className="cr_day_icons-medication-item"
                      >
                        {name} {count} {nominativeCountMeasure}{" "}
                        {routeOfAdministration} {inBeforePreposition} {inBefore}{" "}
                        {mealTime}{" "}
                        {timesOfDay === ALL_DAY && `${frequency} ${times}`}{" "}
                        {comment}
                      </div>
                    );
                  },
                )}
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
};
