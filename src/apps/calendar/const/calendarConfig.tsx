import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Icon } from "@iconify/react";

import { joinCn } from "utils/joinCn";

import { DayCell } from "CR_components/DayCell";

export const calendarConfig: CalendarOptions | Readonly<CalendarOptions> = {
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: "dayGridMonth",
  locale: "ru",
  firstDay: 1,
  dayMaxEventRows: 0,
  headerToolbar: {
    start: "wheel",
    center: "prev title next",
    end: "today",
  },
  height: "100%",
  titleFormat: { year: "numeric", month: "numeric" },
  buttonHints: {
    today: "",
    prev: "",
    next: "",
  },
  buttonIcons: {
    today: "chevron-left",
  },
  dayCellContent: DayCell,
  fixedWeekCount: false,
  moreLinkContent: (arg) => (
    <div>
      <Icon icon="material-symbols:check-box-outline-sharp" /> {arg.num}
    </div>
  ),
  moreLinkHint: "Показать задачи",
  eventOrderStrict: true,
  eventOrder: (): number => 1,
  eventContent: (info) => {
    const { extendedProps, title } = info.event;
    const cn: string = joinCn(
      "fc-event-title",
      extendedProps.checked && "checked",
    );
    return (
      <>
        – <div className={cn}>{title}</div>
      </>
    );
  },
};
