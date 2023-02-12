import { Obj } from "types/other";

import { DayData } from "CR_types/other";

export interface CalendarData extends Obj {
  [year: number]: {
    [month: number]: {
      [day: number]: DayData;
    };
  };
}
