import { create } from "zustand";
import type { EventItem } from "../types";
import { generateMockEvents } from "../data/mockData";

type Store = {
  events: EventItem[];
  addEvent: (event: EventItem) => void;
  updateEvent: (event: EventItem) => void;
};

export const useEventStore = create<Store>((set) => ({
  events: generateMockEvents(100),

  addEvent: (event) =>
    set((state) => ({
      events: [event, ...state.events],
    })),

  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e,
      ),
    })),
}));
