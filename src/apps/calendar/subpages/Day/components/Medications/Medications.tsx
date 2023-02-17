import React from "react";

import {
  GroupedMedications,
  TimesOfDayNominative,
} from "apps/calendar/types/other";
import { useStore } from "effector-react";

import { $options } from "MT_models/option";
import { GroupedOptions } from "MT_types/stores";

import { $currentDate } from "CR_models/calendar";
import { $checkedMedications } from "CR_models/medication";
import { MedicationsDayProps } from "CR_types/props";
import { CheckedMedications } from "CR_types/stores";
import { getGroupedMedications } from "CR_utils/medication";

import { Group } from "./components/Group";

export const Medications: React.FC<MedicationsDayProps> = ({ medications }) => {
  const groupedOptions = useStore<GroupedOptions>($options);
  const checkedMedications =
    useStore<CheckedMedications[]>($checkedMedications);
  const currentDate = useStore<Date | null>($currentDate);

  const groupedMedications: GroupedMedications = getGroupedMedications(
    medications,
    groupedOptions,
    checkedMedications,
    currentDate,
  );
  const timesOfDayList: TimesOfDayNominative[] = Object.keys(
    groupedMedications,
  ) as TimesOfDayNominative[];

  return medications.length ? (
    <div className="cr_day_medications">
      {timesOfDayList.map((timesOfDay) => (
        <Group
          key={timesOfDay}
          medications={groupedMedications[timesOfDay]}
          timesOfDay={timesOfDay}
        />
      ))}
    </div>
  ) : null;
};
