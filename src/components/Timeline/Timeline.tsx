import type { EventItem } from "../../types";
import dayjs from "dayjs";
import { useState } from "react";
import "../../styles/Timeline.css";

type Props = {
  events: EventItem[];
  onEdit?: (event: EventItem) => void;
};

export const Timeline = ({ events, onEdit }: Props) => {
  const [announcement, setAnnouncement] = useState("");

  const grouped = events.reduce(
    (acc, event) => {
      const day = dayjs(event.date).format("YYYY-MM-DD");

      if (!acc[day]) acc[day] = [];
      acc[day].push(event);

      return acc;
    },
    {} as Record<string, EventItem[]>,
  );

  const flatEvents = Object.values(grouped).flat();

  return (
    <div className="container">
      <div aria-live="polite" style={{ position: "absolute", left: -9999 }}>
        {announcement}
      </div>

      {Object.entries(grouped).map(([day, events]) => (
        <div key={day}>
          <h3>{day}</h3>

          {events.map((event) => {
            const currentIndex = flatEvents.findIndex(
              (e) => e.id === event.id
            );

            return (
              <div
                id={event.id}
                key={event.id}
                tabIndex={0}
                onFocus={() =>
                  setAnnouncement(`Focused on ${event.title}`)
                }
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    const next = flatEvents[currentIndex + 1];
                    if (next) {
                      document.getElementById(next.id)?.focus();
                    }
                  }

                  if (e.key === "ArrowUp") {
                    const prev = flatEvents[currentIndex - 1];
                    if (prev) {
                      document.getElementById(prev.id)?.focus();
                    }
                  }
                }}
                onDoubleClick={() => onEdit?.(event)}
                className="event-item"
              >
                {event.title}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};