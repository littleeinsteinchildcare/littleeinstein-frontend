import { useState } from "react";
import { Calendar, momentLocalizer, Event, View } from "react-big-calendar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const messages = {
    today: t("calendar.today"),
    previous: t("calendar.previous"),
    next: t("calendar.next"),
    month: t("calendar.month"),
    week: t("calendar.week"),
    day: t("calendar.day"),
    agenda: t("calendar.agenda"),
    date: t("calendar.date"),
    time: t("calendar.time"),
    event: t("calendar.event"),
    noEventsInRange: t("calendar.noEvents"),
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[700px] h-[700px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          {t("calendar.title")}
        </h1>
        <button 
          onClick={() => navigate('/calendar/events')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          {t("calendar.createEvent")}
        </button>
      </div>
      <Calendar
        localizer={localizer}
        messages={messages}
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
