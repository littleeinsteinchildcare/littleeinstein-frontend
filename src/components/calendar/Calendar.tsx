import { useState, useEffect, useRef } from "react";
import { Calendar, momentLocalizer, View, SlotInfo } from "react-big-calendar";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment-timezone";

// components
import AddEventModal from "@/components/calendar/addEventModal";
import ViewEventModal from "@/components/calendar/viewEventModal";

// context
import { useEvents, CalendarEvent } from "@/context/EventContext";

// auth
import { useMsal } from "@azure/msal-react";

// deafult timezone
moment.tz.setDefault("America/Los_Angeles");
const localizer = momentLocalizer(moment);

const LittleCalendar = () => {
  // auth
  const { accounts } = useMsal();
  const isAuthenticated = accounts.length > 0;

  // nav and translations
  const { t } = useTranslation();
  const navigate = useNavigate();

  // calendar state
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");

  // event data from context
  const { events, addEvent } = useEvents();

  // modal and event states
  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<CalendarEvent>({
    title: "",
    start: new Date(),
    end: new Date(),
    location: "",
    allDay: false,
  });
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );

  // for mouse positioning for modal pop up
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  // refs
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // close modal if clicking outside calendar & anywhere not calendar/modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const clickedNode = e.target as Node;

      const clickedOutsideCalendar =
        calendarRef.current && !calendarRef.current.contains(clickedNode);
      const clickedOutsideModal =
        modalRef.current && !modalRef.current.contains(clickedNode);

      if (clickedOutsideCalendar && clickedOutsideModal) {
        setModalOpen(false);
        setSelectedEvent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // close modal with esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setSelectedEvent(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // handle adding new event
  const handleAddEvent = () => {
    if (!isAuthenticated) {
      alert("You must be signed in to add an event.");
      return;
    }

    if (!newEvent.title.trim()) return;
    addEvent(newEvent);
    setModalOpen(false);
  };

  // handle when selecting a slot (a square in the calendar grid thingy)
  const handleSelectSlot = (slotInfo: SlotInfo) => {
    if (!isAuthenticated) {
      alert(t("calendar.signInWarn"));
      return;
    }

    setNewEvent({
      title: "",
      start: slotInfo.start,
      end: slotInfo.end,
      location: "",
      allDay: false,
    });
    setModalOpen(true);
  };

  // text for calendar buttons
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
    <div className="bg-[#94EE8F] rounded-lg p-4 w-full max-w-5xl h-[800px] mt-10 mx-auto overflow-x-auto border-b-4 border-green-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800">
          {t("calendar.title")}
        </h1>
        <button
          onClick={() => navigate("/calendar/events")}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          {t("calendar.createEvent")}
        </button>
      </div>

      <div ref={calendarRef}>
        <Calendar
          localizer={localizer}
          messages={messages}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          date={date}
          view={view}
          onNavigate={setDate}
          onView={setView}
          selectable={true}
          //https://jquense.github.io/react-big-calendar/examples/index.html?path=/docs/props--on-select-slot
          onSelectSlot={(slotInfo) => {
            let x = 0;
            let y = 0;

            // Try to get click position from `box`
            if (slotInfo.box?.clientX && slotInfo.box?.clientY) {
              x = slotInfo.box.clientX;
              y = slotInfo.box.clientY;
            }
            // Fallback to bounds if needed
            else if (slotInfo.bounds?.x && slotInfo.bounds?.y) {
              x = 120;
              y = 120;
            }

            setClickPosition({ x, y });
            setSelectedEvent(null);
            handleSelectSlot(slotInfo);
          }}
          onSelectEvent={(event: CalendarEvent, e: React.SyntheticEvent) => {
            setModalOpen(false);
            const mouseEvent = e as unknown as MouseEvent;
            setClickPosition({
              x: mouseEvent.clientX,
              y: mouseEvent.clientY,
            });
            setSelectedEvent(event);
          }}
          className="rounded-lg relative overflow-hidden mt-6 border-4 border-green-200 bg-white p-2"
        />
      </div>

      {/* add event modal */}
      {modalOpen && (
        <AddEventModal
          position={clickPosition}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          innerRef={modalRef}
          onClose={() => setModalOpen(false)}
          onSave={handleAddEvent}
        />
      )}

      {/* view event modal */}
      {selectedEvent && (
        <ViewEventModal
          position={clickPosition}
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default LittleCalendar;
