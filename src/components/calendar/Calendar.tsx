import { useState } from "react";
import { Calendar, momentLocalizer, Event, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment-timezone";

moment.tz.setDefault("America/Los_Angeles");
const localizer = momentLocalizer(moment);

const events: Event[] = [
  {
    title: "Intro",
    start: new Date(2025, 2, 1, 10, 0),
    end: new Date(2025, 2, 1, 10, 0),
    allDay: false,
  },
  {
    title: "Child care meet",
    start: new Date(2025, 2, 11, 10, 0),
    end: new Date(2025, 2, 11, 10, 0),
    allDay: false,
  },
];

const LittleCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[700px] h-[700px]">
      <h1 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Calendar
      </h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        date={date}
        view={view}
        onNavigate={(newDate) => setDate(newDate)}
        onView={(newView) => setView(newView)}
        className="rounded-lg"
      />
    </div>
  );
};

export default LittleCalendar;
