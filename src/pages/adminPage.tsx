import { useEffect, useState } from "react";
import "../styles/AdminPage.css";
import { Badge } from "../components/Badge"; // Import the Badge component
import { PatientPhase, PatientsQueue, TriageCategory } from "../../types/patient";
import React from "react";

export function AdminPage() {
  const [queue, setQueue] = useState<PatientsQueue>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tiragedPatientsList , setTiragedPatientList] = React.useState(false);
  const [treatmentPatientList, setTreatmentPatientList] = React.useState(false);
  const [admittedPatientList, setAdmittedPatientList] = React.useState(false);
const [pendingInvestigationsList, setPendingInvestigationsList] = React.useState(false);
    const [dischargedPatientList, setDischargedPatientList] = React.useState(false);
    const [registeredPatientList, setRegisteredPatientList] = React.useState(false);
  
  const triagedPatients = (queue?.patients || [])
  .filter(patient => patient.status.current_phase === PatientPhase.TRIAGED);

const treatmentPatients = (queue?.patients || [])
  .filter(patient => patient.status.current_phase === PatientPhase.TREATMENT);

  const admittedPatients = (queue?.patients || [])
  .filter(patient => patient.status.current_phase === PatientPhase.ADMITTED);

const pendingInvestigations = (queue?.patients || [])
  .filter(patient => patient.status.current_phase === PatientPhase.INVESTIGATIONS_PENDING);

const dischargedPatients = (queue?.patients || [])
  .filter(patient => patient.status.current_phase === PatientPhase.DISCHARGED);

  const registeredPatients = (queue?.patients || [])
  .filter(patient => patient.status.current_phase === PatientPhase.DISCHARGED);


  useEffect(() => {
    
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/get")
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
  const triage = ["Resuscitation", "Emergent", "Urgent", "Less Urgent", "Non Urgent"];

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="kanban-board">
        {/* Triage */}
        <div>
          <h3>Triage</h3>
          <ul className="kanban-column">
            {triagedPatients
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.status)} />
                </li>
              ))}
          </ul>
        </div>

        {/* Admitted */}
        <div>
          <h3>Admitted</h3>
          <ul className="kanban-column">
            {
             admittedPatients .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.status)} />
                </li>
              ))}
          </ul>
        </div>

        {/* Treatment */}
        <div>
          <h3>Treatment</h3>
          <ul className="kanban-column">
            {treatmentPatients
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.status)} />
                </li>
              ))}
          </ul>
        </div>

        {/* Pending Investigations */}
        <div>
          <h3>Pending Investigations</h3>
          <ul className="kanban-column">
            {pendingInvestigations
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.status)} />
                </li>
              ))}
          </ul>
        </div>

        {/* Discharged */}
        <div>
          <h3>Discharged</h3>
          <ul className="kanban-column">
            {dischargedPatients
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.status)} />
                </li>
              ))}
          </ul>
        </div>

        {/* Registered */}
        <div>
          <h3>Registered</h3>
          <ul className="kanban-column">
            {registeredPatients
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.status)} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


