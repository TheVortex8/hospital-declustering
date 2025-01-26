import { useEffect, useState } from "react";
import "../styles/AdminPage.css";
import Badge from "../components/Toast"; // Import the Badge component
import { PatientPhase, PatientsQueue } from "../../types/patient";

export function AdminPage() {
  const [queue, setQueue] = useState<PatientsQueue>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/get");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setQueue(data); // Set the fetched data to the state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
    console.log(queue);
  }, []);

  const getBadgeStyle = (status) => {
    switch (status) {
      case "ordered":
        return { border: "2px solid #6c757d" }; // Gray border
      case "pending":
        return { border: "2px solid #ffc107" }; // Yellow border
      case "reported":
        return { border: "2px solid #28a745" }; // Green border
      default:
        return { border: "2px solid #6c757d" }; // Default Gray border
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="kanban-board">
        {/* Triage */}
        <div>
          <h3>Triage</h3>
          <ul className="kanban-column">
            {queue.patients && queue.patients
              .filter(patient => patient.status.current_phase === PatientPhase.TRIAGED)
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                  {patient.name}
                  <Badge label={patient.status.current_phase} style={getBadgeStyle(patient.status)} />
                </li>
              ))}
          </ul>
        </div>

        {/* Admitted */}
        <div>
          <h3>Admitted</h3>
          <ul className="kanban-column">
            {queue.admitted && queue.admitted.map((patient) => (
              <li className="kanban-item" key={patient.name}>
                {patient.name}
                <Badge label={patient.status} style={getBadgeStyle(patient.status)} />
              </li>
            ))}
          </ul>
        </div>

        {/* Treatment */}
        <div>
          <h3>Treatment</h3>
          <ul className="kanban-column">
            {queue.treatment && queue.treatment.map((patient) => (
              <li className="kanban-item" key={patient.name}>
                {patient.name}
                <Badge label={patient.status} style={getBadgeStyle(patient.status)} />
              </li>
            ))}
          </ul>
        </div>

        {/* Pending Investigations */}
        <div>
          <h3>Pending Investigations</h3>
          <ul className="kanban-column">
            {queue.pendingInvestigations && queue.pendingInvestigations.map((patient) => (
              <li className="kanban-item" key={patient.name}>
                {patient.name}
                <Badge label={patient.status} style={getBadgeStyle(patient.status)} />
              </li>
            ))}
          </ul>
        </div>

        {/* Discharged */}
        <div>
          <h3>Discharged</h3>
          <ul className="kanban-column">
            {queue.discharged && queue.discharged.map((patient) => (
              <li className="kanban-item" key={patient.name}>
                {patient.name}
                <Badge label={patient.status} style={getBadgeStyle(patient.status)} />
              </li>
            ))}
          </ul>
        </div>

        {/* Registered */}
        <div>
          <h3>Registered</h3>
          <ul className="kanban-column">
            {queue.registered && queue.registered.map((patient) => (
              <li className="kanban-item" key={patient.name}>
                {patient.name}
                <Badge label={patient.status} style={getBadgeStyle(patient.status)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}