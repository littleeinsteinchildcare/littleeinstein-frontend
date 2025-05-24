import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  CalendarEvent,
  getEvents,
  addEvent as addEventService,
  updateEvent as updateEventService,
  removeEvent as removeEventService,
  getUserEvents
} from '@/services/eventService';
import { useAuthListener } from '@/auth/useAuthListener';

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
  }) => Promise<CalendarEvent>;
  deleteEvent: (id: string) => Promise<boolean>;
  updateEvent: (event: CalendarEvent) => Promise<CalendarEvent | null>;
  getEvent: (id: string) => CalendarEvent | undefined;
  getUserEvents: (userId: string) => Promise<CalendarEvent[]>;
  refreshEvents: () => Promise<void>;
  canEditEvent: (event: CalendarEvent) => boolean;
  canDeleteEvent: (event: CalendarEvent) => boolean;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const user = useAuthListener();

  const refreshEvents = useCallback(async () => {
    try {
      if (user?.uid) {
        // Fetch events specific to the authenticated user (creator or invitee)
        const fetchedEvents = await getUserEvents(user.uid);
        setEvents(fetchedEvents);
      } else {
        // No user authenticated, clear events
        setEvents([]);
      }
    } catch (error) {
      console.error("Failed to refresh events:", error);
      setEvents([]);
    }
  }, [user?.uid]);

  const addEvent = async (eventData: {
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
    const newEvent = await addEventService({
      ...eventData,
      createdBy: user?.uid || eventData.createdBy || 'current-user'
    });
    await refreshEvents();
    return newEvent;
  };

  const deleteEvent = async (id: string) => {
    await removeEventService(id);
    await refreshEvents();
    return true;
  };

  const updateEvent = async (event: CalendarEvent) => {
    const result = await updateEventService(event);
    await refreshEvents();
    return result;
  };

  const getEvent = (id: string) => {
    return events.find(event => event.id === id);
  };

  const getUserEventsData = async (userId: string) => {
    return await getUserEvents(userId);
  };

  const canEditEvent = (event: CalendarEvent) => {
    return user?.uid === event.createdBy;
  };

  const canDeleteEvent = (event: CalendarEvent) => {
    return user?.uid === event.createdBy;
  };

  // Load events when the provider mounts or user changes
  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  return (
    <EventContext.Provider value={{
      events,
      addEvent,
      deleteEvent,
      updateEvent,
      getEvent,
      getUserEvents: getUserEventsData,
      refreshEvents,
      canEditEvent,
      canDeleteEvent
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