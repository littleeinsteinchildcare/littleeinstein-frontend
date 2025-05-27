import { useState } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment-timezone";
import { CalendarEvent } from "@/services/eventService";
import { useEventContext } from "@/context/EventContext";
import { useAuthListener } from "@/auth/useAuthListener";
import EventsSidebar from "./EventsSidebar";
import EventEditForm from "./EventEditForm";

moment.tz.setDefault("America/Los_Angeles");
const localizer = momentLocalizer(moment);

const LittleCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");
  const [showSidebar, setShowSidebar] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<CalendarEvent | null>(null);
  const [showMyEventsOnly, setShowMyEventsOnly] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAuthListener();
  const { events, updateEvent, deleteEvent, canEditEvent } = useEventContext();

  // Events are automatically loaded by the EventContext, no need to refresh here

  const handleEditEvent = (event: CalendarEvent) => {
    // Only allow editing if user is the creator
    if (canEditEvent(event)) {
      setEventToEdit(event);
    } else {
      // Show a message or just view the event details without editing
      console.log("You can only edit events you created");
      // Could show a toast notification here instead
    }
  };

  const handleUpdateEvent = (updatedEvent: CalendarEvent) => {
    updateEvent(updatedEvent);
    setEventToEdit(null);
  };

  const handleCancelEdit = () => {
    setEventToEdit(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
    setEventToEdit(null);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  // Filter events to show only created events vs all events (created + invited)
  const displayedEvents = showMyEventsOnly 
    ? events.filter(event => event.createdBy === user?.uid)
    : events;

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

  // Render event edit form if an event is being edited
  if (eventToEdit) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 w-[850px] h-[700px] flex flex-col">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{t("events.editEvent")}</h2>
          <button
            onClick={handleCancelEdit}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="flex-grow overflow-y-auto">
          <EventEditForm
            event={eventToEdit}
            onSubmit={handleUpdateEvent}
            onCancel={handleCancelEdit}
            onDelete={canEditEvent(eventToEdit) ? handleDeleteEvent : undefined}
            compact={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[900px] h-[700px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          {t("calendar.title")}
        </h1>
        <div className="flex space-x-2">
          {user && (
            <button
              onClick={() => setShowMyEventsOnly(!showMyEventsOnly)}
              className={`px-4 py-2 rounded-md transition duration-200 ${
                showMyEventsOnly 
                  ? "bg-purple-500 hover:bg-purple-600 text-white" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {showMyEventsOnly ? "Show All My Events" : "My Created Events Only"}
            </button>
          )}
          <button
            onClick={toggleSidebar}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            {showSidebar ? t("calendar.hideSidebar") : t("calendar.showSidebar")}
          </button>
          <button
            onClick={() => navigate('/calendar/events')}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
          >
            {t("calendar.createEvent")}
          </button>
        </div>
      </div>

      <div className="flex h-[630px]">
        <div className={`${showSidebar ? 'w-2/3 pr-4' : 'w-full'} transition-all duration-300`}>
          <Calendar
            localizer={localizer}
            messages={messages}
            events={displayedEvents}
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
            // Enable click on events to show details/edit
            onSelectEvent={(event) => handleEditEvent(event)}
          />
        </div>

        {showSidebar && (
          <div className="w-1/3 pl-4 border-l">
            <EventsSidebar onEditEvent={handleEditEvent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LittleCalendar;
