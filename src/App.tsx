import { DataGrid } from "./components/DataGrid/DataGrid";
import { Timeline } from "./components/Timeline/Timeline";
import { EventForm } from "./components/EventForm/EventForm";
import { useEventStore } from "./store/useEventStore";
import { useState } from "react";
import type { EventItem } from "./types";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const events = useEventStore((s) => s.events);

  const handleEdit = (event: EventItem) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  return (
    <>
      <div className="pageStyle">
        <div className="containerStyle">
          <h1>React Technical Task</h1>

          <button
            onClick={() => {
              setSelectedEvent(null);
              setOpen(true);
            }}
            className="buttonStyle"
          >
            New Event
          </button>
          {open && (
            <div className="overlayStyle" onClick={() => setOpen(false)}>
              <div className="modalStyle" onClick={(e) => e.stopPropagation()}>

                <EventForm
                  initialData={selectedEvent}
                  onSuccess={() => {
                    setOpen(false);
                    setSelectedEvent(null);
                  }}
                />
                <button onClick={() => setOpen(false)} className="buttonStyle">
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="cardStyle">
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
      <ToastContainer />
    </>
  );
}

export default App;
