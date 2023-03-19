import { Obj } from "types/other";

import { DayData, TimesOfDayNominative } from "CR_types/other";

export interface CalendarData extends Obj {
  [year: number]: {
    [month: number]: {
      [day: number]: DayData;
    };
  };
}

export interface CheckedMedications extends Obj {
  id: number;
  date: Date;
  timesOfDay: TimesOfDayNominative;
  medicationId: number;
}

export interface Look {
  date: Date;
  VWLookId: number;
}
