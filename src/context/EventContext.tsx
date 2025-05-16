import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CalendarEvent, getEvents, addEvent as addEventService, resetEvents } from '@/services/eventService';

interface EventContextType {
  events: CalendarEvent[];
  addEvent: (event: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    color: string;
    invitedParents: string[];
  }) => CalendarEvent;
  refreshEvents: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const refreshEvents = () => {
    setEvents(getEvents());
  };

  const addEvent = (eventData: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    description: string;
    color: string;
    invitedParents: string[];
  }) => {
    const newEvent = addEventService(eventData);
    refreshEvents();
    return newEvent;
  };

  // Load events when the provider mounts
  useEffect(() => {
    refreshEvents();
    
    // Reset events when the provider unmounts (for demo purposes)
    return () => {
      resetEvents();
    };
  }, []);

  return (
    <EventContext.Provider value={{ events, addEvent, refreshEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};