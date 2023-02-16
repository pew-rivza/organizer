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

export type MedicationsProps = {
  medications: Medication[];
};

export type MedicationItemProps = {
  medication: MedicationInfo;
  isAllDay: boolean;
};

export type MedicationListProps = {
  timesOfDay: TimesOfDayNominative;
  medications: MedicationInfo[];
};
