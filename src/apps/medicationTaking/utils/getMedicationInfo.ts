import { findObject } from "utils/objects";

import { COUNT_WORD_FIELDS, IN_BEFORE_COMPLIANCE } from "MT_const/common";
import {
  InBeforeComplianceKey,
  MedicationInfo,
  WordForms,
  WordGenders,
} from "MT_types/other";
import { GroupedOptions, Medication, Option } from "MT_types/stores";
import { getWordByCount, getWordByGender } from "MT_utils/options";

export const getMedicationInfo = (
  medication: Medication,
  groupedOptions: GroupedOptions,
): MedicationInfo => {
  const {
    id,
    name,
    count,
    routeOfAdministrationId,
    inWhichId,
    inId,
    frequency,
    frequencyCount,
    timesOfDayId,
    inBeforeCount,
    inBeforeMeasureId,
    periodCount,
    periodMeasureId,
    comment,
  } = medication;

  const countWord = (field: string, isNominative: boolean = false): string => {
    const { countField, optionGroup, measureField } = COUNT_WORD_FIELDS[field];
    return getWordByCount(
      medication[countField] || 0,
      findObject<number, Option>(
        groupedOptions[optionGroup] || [],
        "id",
        medication[measureField] || 0,
      ) as WordForms,
      isNominative,
    );
  };

  const valueWord = (field: string): string => {
    return (
      findObject<number, Option>(
        groupedOptions[field],
        "id",
        medication[`${field}Id`],
      )?.value || ""
    );
  };

  const genderWord = (field: string): string => {
    return getWordByGender(
      { masculine, feminine, neuter },
      findObject<number, Option>(
        groupedOptions[field],
        "id",
        medication[`${field}Id`],
      ) as WordGenders,
    );
  };

  const timesWord = (): string => {
    return getWordByCount(frequency || 0, groupedOptions.times[0] as WordForms);
  };

  const { masculine, feminine, neuter } =
    findObject<number, Option>(groupedOptions.in, "id", inId || 0) || {};

  const mealTime: InBeforeComplianceKey = valueWord(
    "mealTime",
  ) as InBeforeComplianceKey;

  const routeOfAdministration: string =
    (routeOfAdministrationId && valueWord("routeOfAdministration")) || "";

  const whichIn: string =
    (inWhichId && inId && `в ${genderWord("inWhich")} ${valueWord("in")}`) ||
    "";

  const computedFrequencyCount: number | string =
    (frequencyCount !== 1 && frequencyCount) || "";

  const timesOfDay: string = (timesOfDayId && valueWord("timesOfDay")) || "";

  const inBeforePreposition: string =
    (mealTime && inBeforeCount && IN_BEFORE_COMPLIANCE[mealTime]) || "";

  const inBefore: string =
    (inBeforeCount &&
      inBeforeMeasureId &&
      `${inBeforeCount} ${countWord("inBefore")}`) ||
    "";

  const computedMealTime: string =
    (mealTime && `${mealTime} приема пищи`) || "";

  const period: string =
    (periodCount &&
      periodMeasureId &&
      `в течение ${periodCount} ${countWord("period")}`) ||
    "";

  const computedComment: string = (comment && `(${comment})`) || "";

  return {
    id: id || 0,
    name,
    count: count || 0,
    countMeasure: countWord("count"),
    nominativeCountMeasure: countWord("count", true),
    routeOfAdministration: routeOfAdministration || whichIn,
    frequency: frequency || 0,
    times: timesWord(),
    frequencyCount: computedFrequencyCount,
    frequencyMeasure: countWord("frequency"),
    timesOfDay,
    inBeforePreposition,
    inBefore,
    mealTime: computedMealTime,
    period,
    comment: computedComment,
  };
};
