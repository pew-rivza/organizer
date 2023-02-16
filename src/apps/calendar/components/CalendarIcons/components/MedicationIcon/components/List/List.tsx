import React from "react";

import { MedicationInfo } from "MT_types/other";

import { ALL_DAY } from "CR_const/common";
import { MedicationListProps } from "CR_types/props";

import { Item } from "./../Item";

export const List: React.FC<MedicationListProps> = ({
  timesOfDay,
  medications,
}) => {
  return (
    <React.Fragment>
      {!!medications.length && (
        <div className="cr_day_icons-medication-header">{timesOfDay}</div>
      )}
      {medications.map((medication: MedicationInfo) => {
        return (
          <Item
            key={`medications-list-${timesOfDay}-${medication.id}`}
            medication={medication}
            isAllDay={timesOfDay === ALL_DAY}
          />
        );
      })}
    </React.Fragment>
  );
};
