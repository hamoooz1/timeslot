import React, { useState } from "react";
import "./TimeGrid.css";

// Utility to calculate duration from "HH:mm" to "HH:mm"
const calculateDuration = (from, to) => {
  const [fromH, fromM] = from.split(":").map(Number);
  const [toH, toM] = to.split(":").map(Number);

  const start = fromH * 60 + fromM;
  const end = toH * 60 + toM;
  const diff = end - start;

  if (diff <= 0) return "0 mins";

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours ? `${hours}h` : ""} ${minutes ? `${minutes}m` : ""}`.trim();
};

// Convert UTC date string to Central Time formatted as YYYY-MM-DD
const getCentralDate = () => {
  const now = new Date();
  const centralOffset = -6 * 60; // UTC-6
  const localOffset = now.getTimezoneOffset();
  const centralDate = new Date(now.getTime() + (centralOffset - localOffset) * 60000);
  return centralDate.toISOString().split("T")[0];
};

const TimeGrid = ({ logs, onEdit, onDelete }) => {
  const [editing, setEditing] = useState(null); // { day, index }
  const [editForm, setEditForm] = useState({ description: "", from: "", to: "" });

  const sortedDays = Object.keys(logs).sort((a, b) => new Date(a) - new Date(b));
  const today = getCentralDate();

  const startEditing = (day, index, entry) => {
    setEditing({ day, index });
    setEditForm({ ...entry });
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = () => {
    if (editing) {
      onEdit(editing.day, editing.index, editForm);
      setEditing(null);
    }
  };

  const cancelEdit = () => {
    setEditing(null);
  };

  return (
    <div className="grid-container">
      {sortedDays.map((day) => (
        <div key={day} className="day-column">
          <h3 className={day === today ? "today-heading" : "date-heading"}>
            {day === today ? "Today" : day}
          </h3>

          {[...logs[day]]
            .sort((a, b) => a.from.localeCompare(b.from))
            .map((entry, idx) => {
              const duration = calculateDuration(entry.from, entry.to);
              return (
                <div key={idx} className="entry-card">
                  {editing?.day === day && editing?.index === idx ? (
                    <>
                      <input
                        type="time"
                        value={editForm.from}
                        onChange={(e) => handleEditChange("from", e.target.value)}
                      />
                      <input
                        type="time"
                        value={editForm.to}
                        onChange={(e) => handleEditChange("to", e.target.value)}
                      />
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => handleEditChange("description", e.target.value)}
                        placeholder="What did you do?"
                      />
                      <div className="btn-group">
                        <button onClick={saveEdit}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <strong>
                        {entry.from} - {entry.to}{" "}
                        <span className="duration-tag">({duration})</span>
                      </strong>
                      <p>{entry.description}</p>
                      <div className="btn-group">
                        <button onClick={() => startEditing(day, idx, entry)}>Edit</button>
                        <button onClick={() => onDelete(day, idx)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};

export default TimeGrid;
