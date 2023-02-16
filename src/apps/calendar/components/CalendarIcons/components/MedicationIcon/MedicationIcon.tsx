import React from "react";

import { useStore } from "effector-react";

import { $options } from "MT_models/option";
import { GroupedOptions } from "MT_types/stores";

import { $checkedMedications } from "CR_models/medication";
import { TimesOfDayNominative } from "CR_types/other";
import { MedicationIconProps } from "CR_types/props";
import { CheckedMedications } from "CR_types/stores";
import { getGroupedMedications } from "CR_utils/medication";

import { IconTemplate } from "./../IconTemplate";
import { List } from "./components/List";

import "./MedicationIcon.scss";

export const MedicationIcon: React.FC<MedicationIconProps> = ({
  id,
  medications,
  disabled,
}) => {
  const groupedOptions = useStore<GroupedOptions>($options);
  const checkedMedications =
    useStore<CheckedMedications[]>($checkedMedications);
  const [date, month, year] = id.split(".");
  const currentDate: Date = new Date(+year, +month - 1, +date);
  const groupedMedications = getGroupedMedications(
    medications,
    groupedOptions,
    checkedMedications,
    currentDate,
  );

  return (
    <IconTemplate
      disabled={disabled}
      prefix={"medication"}
      id={id}
      icon={"game-icons:medicines"}
    >
      {(Object.keys(groupedMedications) as TimesOfDayNominative[]).map(
        (timesOfDay) => {
          return (
            <List
              key={`medications-list-${id}-${timesOfDay}`}
              medications={groupedMedications[timesOfDay]}
              timesOfDay={timesOfDay}
            />
          );
        },
      )}
    </IconTemplate>
  );
};
