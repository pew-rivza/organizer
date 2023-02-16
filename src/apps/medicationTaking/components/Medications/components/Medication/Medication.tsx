import React from "react";

import { useStore } from "effector-react";

import { $options } from "MT_models/option";
import { MedicationInfo } from "MT_types/other";
import { MedicationProps } from "MT_types/props";
import { GroupedOptions } from "MT_types/stores";
import { getMedicationInfo } from "MT_utils/getMedicationInfo";

export const Medication: React.FC<MedicationProps> = ({ medication }) => {
  const groupedOptions = useStore<GroupedOptions>($options);
  const medicationInfo: MedicationInfo = getMedicationInfo(
    medication,
    groupedOptions,
  );
  const {
    name,
    count,
    countMeasure,
    routeOfAdministration,
    frequency,
    times,
    frequencyCount,
    frequencyMeasure,
    timesOfDay,
    inBeforePreposition,
    inBefore,
    mealTime,
    period,
    comment,
  } = medicationInfo;

  return (
    <li>
      {name} по {count} {countMeasure} {routeOfAdministration} {frequency}{" "}
      {times} в {frequencyCount} {frequencyMeasure} {timesOfDay}{" "}
      {inBeforePreposition} {inBefore} {mealTime} {period} {comment}
    </li>
  );
};
