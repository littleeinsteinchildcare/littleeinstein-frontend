import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CalendarEvent,
  getEvents,
  addEvent as addEventService,
  deleteEvent as deleteEventService,
  updateEvent as updateEventService,
  getEventById,
  getUserEvents,
  resetEvents
} from '@/services/eventService';

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
    createdBy?: string;
  }) => CalendarEvent;
  deleteEvent: (id: string) => boolean;
  updateEvent: (event: CalendarEvent) => CalendarEvent | null;
  getEvent: (id: string) => CalendarEvent | undefined;
  getUserEvents: (userId: string) => CalendarEvent[];
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
    createdBy?: string;
  }) => {
    const newEvent = addEventService(eventData);
    refreshEvents();
    return newEvent;
  };

  const deleteEvent = (id: string) => {
    const result = deleteEventService(id);
    if (result) {
      refreshEvents();
    }
    return result;
  };

  const updateEvent = (event: CalendarEvent) => {
    const result = updateEventService(event);
    if (result) {
      refreshEvents();
    }
    return result;
  };

  const getEvent = (id: string) => {
    return getEventById(id);
  };

  const getUserEventsData = (userId: string) => {
    return getUserEvents(userId);
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
    <EventContext.Provider value={{
      events,
      addEvent,
      deleteEvent,
      updateEvent,
      getEvent,
      getUserEvents: getUserEventsData,
      refreshEvents
    }}>
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