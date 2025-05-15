import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define event structure
export interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  location?: string;
  allDay?: boolean;
}

// Define context structure
interface EventContextType {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  addEvent: (event: CalendarEvent) => void;
  deleteEvent: (title: string) => void; // use id later on
}

// event context
const EventContext = createContext<EventContextType | undefined>(undefined);

// provider
export const EventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const stored = localStorage.getItem("calendarEvents");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CalendarEvent[];
        // convert stored string dates back into Date objects
        return parsed.map((e) => ({
          ...e,
          start: new Date(e.start),
          end: new Date(e.end),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  // save to localStorage on change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

  // add event to state
  const addEvent = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
  };

  // remove event by title - use id when backend is ready
  const deleteEvent = (title: string) => {
    setEvents((prev) => prev.filter((e) => e.title !== title));
  };

  return (
    <EventContext.Provider value={{ events, setEvents, addEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
};
