import React from "react";

import { WITH_PERIOD_KEY } from "MT_const/common";
import { WithPeriodMedicationsProps } from "MT_types/props";

import { Medication } from "./../Medication";

export const WithPeriodMedications: React.FC<WithPeriodMedicationsProps> = ({
  groupedMedications,
}) => {
  return (
    <React.Fragment>
      {Object.keys(groupedMedications[WITH_PERIOD_KEY] || {}).map((period) => (
        <React.Fragment key={period}>
          <div className="mt_course_medications-period">{period}</div>
          <ul className="dashed-list">
            {(groupedMedications[WITH_PERIOD_KEY]?.[period] || []).map(
              (medication) => (
                <Medication key={medication.id} medication={medication} />
              ),
            )}
          </ul>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};
