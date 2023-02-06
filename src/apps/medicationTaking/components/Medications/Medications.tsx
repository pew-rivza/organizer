import React from "react";
import Skeleton from "react-loading-skeleton";

import { WithPeriodMedications } from "MT_components/Medications/components/WithPeriodMedications";
import { GroupedMedicationsByPeriod } from "MT_types/other";
import { MedicationsProps } from "MT_types/props";
import { groupMedicationsByPeriod } from "MT_utils/groupObjects";

import "./Medications.scss";
import { WithoutPeriodMedications } from "./components/WithoutPeriodMedications";

export const Medications: React.FC<MedicationsProps> = ({
  medications,
  courseStart,
  withoutPeriodCourseEnd,
}) => {
  const groupedMedications: GroupedMedicationsByPeriod =
    groupMedicationsByPeriod(medications);

  return (
    <div className="mt_course_medications">
      {Object.keys(groupedMedications).length ? (
        <React.Fragment>
          <WithoutPeriodMedications
            groupedMedications={groupedMedications}
            courseStart={courseStart}
            withoutPeriodCourseEnd={withoutPeriodCourseEnd}
          />

          <WithPeriodMedications groupedMedications={groupedMedications} />
        </React.Fragment>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};
