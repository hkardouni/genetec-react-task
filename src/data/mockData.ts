import type { EventItem } from "../types";

export const generateMockEvents = (count: number): EventItem[] => {
  const events: EventItem[] = [];

  for (let i = 0; i < count; i++) {
    events.push({
      id: String(i),
      title: `Event ${i + 1}`,
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    });
  }

  return events;
};
