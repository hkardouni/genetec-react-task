import { DataGrid } from "./components/DataGrid/DataGrid";
import { Timeline } from "./components/Timeline/Timeline";
import { EventForm } from "./components/EventForm/EventForm";
import { useEventStore } from "./store/useEventStore";
import { useState } from "react";
import type { EventItem } from "./types";
import './App.css'

function App() {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const events = useEventStore((s) => s.events);

  const overlayStyle = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const modalStyle = {
    background: "white",
    padding: "24px",
    borderRadius: "10px",
    minWidth: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  };

  const containerStyle = {
    // maxWidth: "100%",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif",
    minHeight: "100vh",
  };

  const buttonStyle = {
    padding: "8px 14px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
    marginBottom: "10px",
  };
  const cardStyle = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  };

  const pageStyle = {
    // width: "100%",
    background: "#f9fafb",
    minHeight: "100vh",
  };

  const handleEdit = (event: EventItem) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1>React Task</h1>

        <button
          onClick={() => {
            setSelectedEvent(null);
            setOpen(true);
          }}
          style={buttonStyle}
        >
          New Event
        </button>
        {open && (
          <div style={overlayStyle} onClick={() => setOpen(false)}>
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
              <h2>New Event</h2>

              <EventForm
                initialData={selectedEvent}
                onSuccess={() => {
                  setOpen(false);
                  setSelectedEvent(null);
                }}
              />
              <button onClick={() => setOpen(false)} style={buttonStyle}>
                Close
              </button>
            </div>
          </div>
        )}
        <div style={cardStyle}>
          <DataGrid
            data={events}
            columns={[
              { key: "title", label: "Title" },
              { key: "date", label: "Date" },
            ]}
            onEdit={handleEdit}
          />
        </div>
        <Timeline events={events} onEdit={handleEdit} />
      </div>
    </div>
  );
}

export default App;
