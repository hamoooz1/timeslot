import React, { useState } from "react";
import "./AddEntryModal.css";

const AddEntryModal = ({ onClose, onSave }) => {
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    if (!description || !from || !to) {
      alert("Please fill all fields.");
      return;
    }
    onSave(today, { description, from, to });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Add Time Entry</h2>
        <input
          type="text"
          placeholder="What did you do?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="time-inputs">
          <input type="time" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="time" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="modal-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button className="cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddEntryModal;
