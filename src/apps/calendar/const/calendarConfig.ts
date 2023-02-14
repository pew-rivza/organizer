import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export const calendarConfig: CalendarOptions | Readonly<CalendarOptions> = {
  plugins: [interactionPlugin, dayGridPlugin],
  initialView: "dayGridMonth",
  locale: "ru",
  firstDay: 1,
  dayMaxEventRows: 4,
  headerToolbar: {
    start: "",
    center: "prev title next",
    end: "",
  },
  titleFormat: { year: "numeric", month: "numeric" },
  selectable: true,
};
