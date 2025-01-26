import { useEffect, useState } from "react";
import "../styles/adminPage.css";
import { Badge } from "../components/Badge"; // Import the Badge component
import { Patient, PatientPhase, PatientsQueue } from "../../types/patient";
import { useDragAndDrop } from "@formkit/drag-and-drop/react"

export function AdminPage() {
  const [queue, setQueue] = useState<PatientsQueue>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   

  
  const [triagedPatients, setTriagedPatients] = useState<Patient[]>([]);
  const [treatmentPatients, setTreatmentPatients] = useState<Patient[]>([]);
  const [admittedPatients, setAdmittedPatients] = useState<Patient[]>([]);
  const [pendingInvestigations, setPendingInvestigations] = useState<Patient[]>([]);
  const [dischargedPatients, setDischargedPatients] = useState<Patient[]>([]);
  const [registeredPatients, setRegisteredPatients] = useState<Patient[]>([]);

  const [triaged, triagedPatient, setTriagedPatient] = useDragAndDrop<HTMLUListElement, Patient>(
    triagedPatients,
    {
      group: "triaged",
    }
  );
  const [treatment, treatmentPatient, setTreatmentPatient] = useDragAndDrop<HTMLUListElement, Patient>(
    treatmentPatients,
    {
      group: "triaged",
    }
  );
  const [admitted, patientsAdmitted, setPatientsAdmitted] = useDragAndDrop<HTMLUListElement, Patient>(
    admittedPatients,
    {
      group: "triaged",
    }
  );
  const [pendingInvestigation, pendingInvestigationPatient, setPendingInvestigationPatient] = useDragAndDrop<HTMLUListElement, Patient>(
    pendingInvestigations,
    {
      group: "triaged",
    }
  );
  const [discharged, dischargedPatient, setDischargedPatient] = useDragAndDrop<HTMLUListElement, Patient>(
    dischargedPatients,
    {
      group: "triaged",
    }
  );
  const [registered, registeredPatient, setRegisteredPatient] = useDragAndDrop<HTMLUListElement, Patient>(
    registeredPatients,
    {
      group: "triaged",
    }
  );

  useEffect(() => {
    if (queue) {
      setTriagedPatients(queue.patients.filter(patient => patient.status.current_phase === PatientPhase.TRIAGED));
      setTriagedPatient(triagedPatients);
      setTreatmentPatients(queue.patients.filter(patient => patient.status.current_phase === PatientPhase.TREATMENT));
      setTreatmentPatient(treatmentPatients);
      setAdmittedPatients(queue.patients.filter(patient => patient.status.current_phase === PatientPhase.ADMITTED));
      setPatientsAdmitted(admittedPatients);
      setPendingInvestigations(queue.patients.filter(patient => patient.status.current_phase === PatientPhase.INVESTIGATIONS_PENDING));
      setPendingInvestigationPatient(pendingInvestigations);
      setDischargedPatients(queue.patients.filter(patient => patient.status.current_phase === PatientPhase.DISCHARGED));
      setDischargedPatient(dischargedPatients);
      setRegisteredPatients(queue.patients.filter(patient => patient.status.current_phase === PatientPhase.DISCHARGED));
      setRegisteredPatient(registeredPatients);
    }
  }, [queue]);
  


  useEffect(() => {
    
    const fetchPatients = async () => {
      try {
        const response = await fetch("/api/get")
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
        return { border: "#6c757d" }; // Gray border
      case "pending":
        return { border: "#ffc107" }; // Yellow border
      case "reported":
        return { border: "#28a745" }; // Green border
      case 1:
        return { border: "#007bff" }; // Blue border
      case 2:
        return { border: "#dc3545" }; // Red border
      case 3:
        return { border: "#ffc107" }; // Yellow border
      case 4:
        return { border: "#28a745" }; // Green border
      case 5:
        return { border: "#ffffff" }; // White border
      default:
        return { border: "#6c757d" }; // Default Gray border
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
          <ul ref={triaged}className="kanban-column">
            {triagedPatient
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                  {patient.status.investigations && (
                    <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                  )}
                    
                  </span>
              </li>
              ))}
          </ul>
        </div>

        {/* Admitted */}
        <div>
          <h3>Admitted</h3>
          <ul ref={admitted}className="kanban-column">
            {
             patientsAdmitted .map((patient) => (
              <li className="kanban-item" key={patient.name}>
              <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                {patient.name}
                <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
              </span>
                <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                {patient.status.investigations && (
                  <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                )}
                  
                </span>
            </li>
              ))}
          </ul>
        </div>

        {/* Treatment */}
        <div>
          <h3>Treatment</h3>
          <ul ref={treatment} className="kanban-column">
            {treatmentPatient
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                  {patient.status.investigations && (
                    <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                  )}
                    
                  </span>
              </li>
              ))}
          </ul>
        </div>

        {/* Pending Investigations */}
        <div>
          <h3>Pending Investigations</h3>
          <ul ref={pendingInvestigation} className="kanban-column">
            {pendingInvestigationPatient
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                  {patient.status.investigations && (
                    <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                  )}
                    
                  </span>
              </li>
              ))}
          </ul>
        </div>

        {/* Discharged */}
        <div>
          <h3>Discharged</h3>
          <ul ref={discharged}className="kanban-column">
            {dischargedPatient
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                  {patient.status.investigations && (
                    <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                  )}
                    
                  </span>
              </li>
              ))}
          </ul>
        </div>

        {/* Registered */}
        <div>
          <h3>Registered</h3>
          <ul ref={registered}className="kanban-column">
            {registeredPatient
              .map((patient) => (
                <li className="kanban-item" key={patient.name}>
                <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                  {patient.name}
                  <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                  {patient.status.investigations && (
                    <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                  )}
                    
                  </span>
              </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}




