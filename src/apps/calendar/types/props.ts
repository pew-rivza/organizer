import { Medication } from "MT_types/stores";

export type CalendarIconsProps = {
  date: Date;
  disabled: boolean;
};

export type MedicationIconProps = {
  id: string;
  medications: Medication[];
  disabled: boolean;
};
