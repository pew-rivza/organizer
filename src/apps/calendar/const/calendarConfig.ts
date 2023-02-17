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
  customButtons: {
    wheel: {
      icon: "chevron-left",
      click: () => {
        console.log("hello!");
      },
    },
  },
};
