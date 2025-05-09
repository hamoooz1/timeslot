import React, { useState, useEffect } from "react";
import "./App.css";
import TimeGrid from "./components/TimeGrid";
import AddEntryModal from "./components/AddEntryModal";
import NavBar from "./components/NavBar";

function App() {
  const [logs, setLogs] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("timeLogs");
    if (data) setLogs(JSON.parse(data));
  }, []);

  const addEntry = (date, entry) => {
    const newLogs = { ...logs };
    if (!newLogs[date]) newLogs[date] = [];
    newLogs[date].push(entry);
    setLogs(newLogs);
    localStorage.setItem("timeLogs", JSON.stringify(newLogs));
  };


  const handleEdit = (day, index, updatedEntry) => {
    const updatedLogs = { ...logs };
    updatedLogs[day][index] = updatedEntry;
    setLogs(updatedLogs);
    localStorage.setItem("timeLogs", JSON.stringify(updatedLogs));
  };
  
  const handleDelete = (day, index) => {
    const updatedLogs = { ...logs };
    updatedLogs[day].splice(index, 1);
    if (updatedLogs[day].length === 0) {
      delete updatedLogs[day];
    }
    setLogs(updatedLogs);
    localStorage.setItem("timeLogs", JSON.stringify(updatedLogs));
  };
  
  return (
    <>
    <NavBar />
    <div className="app">
    
      <header className="app-header">
        <button onClick={() => setShowModal(true)}>Add Entry</button>
      </header>

      <TimeGrid logs={logs} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <AddEntryModal onClose={() => setShowModal(false)} onSave={addEntry} />
      )}
    </div>
    </>
  );
}

export default App;
