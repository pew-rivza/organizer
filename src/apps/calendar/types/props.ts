import { MedicationInfo } from "MT_types/other";
import { Medication } from "MT_types/stores";

import { TimesOfDayNominative } from "CR_types/other";

export type CalendarIconsProps = {
  date: Date;
  disabled: boolean;
};

export type IconTemplateProps = {
  disabled: boolean;
  prefix: string;
  id: string;
  icon: string;
  children: JSX.Element | JSX.Element[];
};

export type MedicationIconProps = {
  id: string;
  medications: Medication[];
  disabled: boolean;
};

export type MedicationItemIconProps = {
  medication: MedicationInfo;
  isAllDay: boolean;
};

export type MedicationListIconProps = {
  timesOfDay: TimesOfDayNominative;
  medications: MedicationInfo[];
};

export type MedicationsDayProps = {
  medications: Medication[];
};

export type MedicationItemDayProps = {
  medication: MedicationInfo;
  timesOfDay: TimesOfDayNominative;
};

export type MedicationHeaderDayProps = {
  timesOfDay: TimesOfDayNominative;
};

export type MedicationsGroupDayProps = {
  medications: MedicationInfo[];
  timesOfDay: TimesOfDayNominative;
};

export type DayDateProps = { date: Date | null };
export type DayToolbarProps = { date: Date | null };
