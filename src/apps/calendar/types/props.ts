import React from "react";

import { TimesOfDayNominative } from "CR_types/other";

import { Todo } from "CL_types/stores";

import { MedicationInfo } from "MT_types/other";
import { Medication } from "MT_types/stores";

import { Look } from "VW_types/stores";

export type CalendarIconsProps = {
  date: Date;
  disabled: boolean;
};

export type IconTemplateProps = {
  disabled: boolean;
  prefix: string;
  id: string;
  icon: string;
  children: React.ReactNode;
};

type IconProps = {
  id: string;
  disabled: boolean;
};

export type MedicationIconProps = IconProps & {
  medications: Medication[];
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

export type LookDayProps = {
  look: Look;
  date: Date;
};

export type TodosDayProps = {
  todos: Todo[];
};

export type TodoItemDayProps = {
  todo: Todo;
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

export type WheelTodosProps = { isOpen: boolean };

export type LookIconProps = IconProps & {
  look: Look;
};
