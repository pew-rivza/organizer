import { useStore } from "effector-react";
import React from "react";

import { $options } from "MT_models/option";
import { MedicationInfo } from "MT_types/other";
import { GroupedOptions } from "MT_types/stores";

import { ALL_DAY } from "CR_const/common";
import { MedicationIconProps } from "CR_types/props";
import { getGroupedMedications } from "CR_utils/medication";

import { IconTemplate } from "./../IconTemplate";

export const MedicationIcon: React.FC<MedicationIconProps> = ({
  id,
  medications,
  disabled,
}) => {
  const groupedOptions = useStore<GroupedOptions>($options);
  const groupedMedications = getGroupedMedications(medications, groupedOptions);

  const Item: React.FC<{
    medication: MedicationInfo;
    isAllDay: boolean;
  }> = ({ medication, isAllDay }) => {
    const { name, count, nominativeCountMeasure, frequency, times } =
      medication;

    return (
      <div className="cr_day_icons-medication-item">
        {name} {count} {nominativeCountMeasure}{" "}
        {isAllDay && `${frequency} ${times}`}
      </div>
    );
  };

  const List: React.FC<{ timesOfDay: string }> = ({ timesOfDay }) => {
    return (
      <React.Fragment>
        {!!groupedMedications[timesOfDay].length && (
          <div className="cr_day_icons-medication-header">{timesOfDay}</div>
        )}
        {groupedMedications[timesOfDay].map((medication: MedicationInfo) => {
          return (
            <Item
              key={`medications-list-${id}-${medication.id}`}
              medication={medication}
              isAllDay={timesOfDay === ALL_DAY}
            />
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <IconTemplate
      disabled={disabled}
      prefix={"medication"}
      id={id}
      icon={"game-icons:medicines"}
    >
      {Object.keys(groupedMedications).map((timesOfDay) => {
        return (
          <List
            key={`medications-list-${id}-${timesOfDay}`}
            timesOfDay={timesOfDay}
          />
        );
      })}
    </IconTemplate>
  );
};
