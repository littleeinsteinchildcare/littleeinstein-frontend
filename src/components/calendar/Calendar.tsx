import { useState, useEffect } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment-timezone";
import { CalendarEvent } from "@/services/eventService";
import { useEventContext } from "@/context/EventContext";

moment.tz.setDefault("America/Los_Angeles");
const localizer = momentLocalizer(moment);

const LittleCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { events, refreshEvents } = useEventContext();

  // Refresh events when the component mounts
  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

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

  // Custom event styling based on event color
  const eventStyleGetter = (event: CalendarEvent) => {
    const style = {
      backgroundColor: event.color || '#4CAF50',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style
    };
  };

  // Custom tooltip for events
  const tooltipAccessor = (event: CalendarEvent) => {
    let tooltip = `${event.title}`;
    if (event.location) tooltip += `\nLocation: ${event.location}`;
    if (event.description) tooltip += `\n${event.description}`;
    return tooltip;
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
        eventPropGetter={eventStyleGetter}
        tooltipAccessor={tooltipAccessor}
        className="rounded-lg"
      />
    </div>
  );
};

export default LittleCalendar;
