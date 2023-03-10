import React from "react";

import { dateFormatter } from "const/common";

import { WITH_PERIOD_KEY, WITHOUT_PERIOD_KEY } from "MT_const/common";
import { WithoutPeriodMedicationsProps } from "MT_types/props";

import { Medication } from "./../Medication";

export const WithoutPeriodMedications: React.FC<
  WithoutPeriodMedicationsProps
> = ({ groupedMedications, courseStart, withoutPeriodCourseEnd }) => {
  return courseStart && groupedMedications[WITHOUT_PERIOD_KEY]?.length ? (
    <React.Fragment>
      {groupedMedications[WITH_PERIOD_KEY] && (
        <div className="mt_course_medications-period">
          {dateFormatter.format(courseStart)} –{" "}
          {dateFormatter.format(withoutPeriodCourseEnd)}
        </div>
      )}
      <ul className="dashed-list">
        {groupedMedications[WITHOUT_PERIOD_KEY].map((medication) => (
          <Medication key={medication.id} medication={medication} />
        ))}
      </ul>
    </React.Fragment>
  ) : null;
};
