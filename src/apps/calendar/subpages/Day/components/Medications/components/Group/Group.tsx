import React from "react";

import { MedicationsGroupDayProps } from "CR_types/props";

import { Header } from "./../Header";
import { Item } from "./../Item";

import "./Group.scss";

export const Group: React.FC<MedicationsGroupDayProps> = ({
  medications,
  timesOfDay,
}) => {
  return !!medications.length ? (
    <React.Fragment>
      <Header timesOfDay={timesOfDay} />

      <div className="cr_day_medications-list">
        {medications.map((medication) => (
          <Item
            key={`${timesOfDay}-${medication.id}`}
            medication={medication}
            timesOfDay={timesOfDay}
          />
        ))}
      </div>
    </React.Fragment>
  ) : null;
};
