import type { EventItem } from "../../types";
import dayjs from "dayjs";
import { useState } from "react";

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

  return (
    <div style={{ marginTop: "30px" }}>
      <div aria-live="polite" style={{ position: "absolute", left: -9999 }}>
        {announcement}
      </div>

      {Object.entries(grouped).map(([day, events]) => (
        <div key={day}>
          <h3 style={{ marginTop: "20px", color: "#374151" }}>{day}</h3>

          {events.map((event) => (
            <div
              key={event.id}
              tabIndex={0}
              onFocus={() => setAnnouncement(`Focused on ${event.title}`)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  (e.currentTarget.nextSibling as HTMLElement)?.focus();
                }

                if (e.key === "ArrowUp") {
                  (e.currentTarget.previousSibling as HTMLElement)?.focus();
                }
              }}
              onDoubleClick={() => onEdit?.(event)}
              style={{
                padding: "10px",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                marginBottom: "6px",
                background: "white",
                cursor: "pointer",
              }}
            >
              {event.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
