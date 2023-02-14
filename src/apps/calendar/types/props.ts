import { Medication } from "MT_types/stores";

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
