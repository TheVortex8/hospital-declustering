import { useEffect, useState } from "react";
import "../styles/adminPage.css";
import { Badge } from "../components/Badge"; // Import the Badge component
import { Patient, PatientPhase, PatientsQueue, TriageCategory } from "../../types/patient";
import { useDragAndDrop } from "@formkit/drag-and-drop/react"

export function AdminPage() {
  const [queue, setQueue] = useState<PatientsQueue>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPatients, setSelectedPatients] = useState<Set<string>>(new Set());
  const [newGroup, setNewGroup] = useState<PatientPhase | "">("");
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [newPatient, setNewPatient] = useState({
    id: "anon99",
    name: "",
    arrivalTime: new Date(),
    birthDate: new Date(),
    triageCategory: TriageCategory.NON_URGENT,
    status: { current_phase: PatientPhase.REGISTERED}
  });

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
      handleStateChange(queue);
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
        setQueue(data); // Set the fetched data to the state
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
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
        return { border: "#f8f9fa" }; // Light gray border
      default:
        return { border: "#6c757d" }; // Default Gray border
    }
  };

  const handleStateChange = (data: PatientsQueue) => {
    setTriagedPatients(data.patients.filter(patient => patient.status.current_phase === PatientPhase.TRIAGED));
      setTriagedPatient(triagedPatients);
      setTreatmentPatients(data.patients.filter(patient => patient.status.current_phase === PatientPhase.TREATMENT));
      setTreatmentPatient(treatmentPatients);
      setAdmittedPatients(data.patients.filter(patient => patient.status.current_phase === PatientPhase.ADMITTED));
      setPatientsAdmitted(admittedPatients);
      setPendingInvestigations(data.patients.filter(patient => patient.status.current_phase === PatientPhase.INVESTIGATIONS_PENDING));
      setPendingInvestigationPatient(pendingInvestigations);
      setDischargedPatients(data.patients.filter(patient => patient.status.current_phase === PatientPhase.DISCHARGED));
      setDischargedPatient(dischargedPatients);
      setRegisteredPatients(data.patients.filter(patient => patient.status.current_phase === PatientPhase.DISCHARGED));
      setRegisteredPatient(registeredPatients);
  }

  const handleCheckboxChange = (patientName: string) => {
    setSelectedPatients(prev => {
      const newSelectedPatients = new Set(prev);
      if (newSelectedPatients.has(patientName)) {
        newSelectedPatients.delete(patientName);
      } else {
        newSelectedPatients.add(patientName);
      }
      return newSelectedPatients;
    });
  };

  const handleMoveUser = async () => {
    if (newGroup) {
      const updatedPatients = Array.from(selectedPatients).map(patientName => {
        const patient = queue.patients.find(p => p.name === patientName);
        if (patient) {
          return { ...patient, status: { ...patient.status, current_phase: newGroup as PatientPhase } };
        }
        return null;
      }).filter(Boolean);

      const updatePatient = async (patient) => {
        try {
          const response = await fetch("/api/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(patient),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        } catch (err) {
          console.error("Failed to update patient:", err);
        }
      };

      await Promise.all(updatedPatients.map(updatePatient));
      const response = await fetch("/api/get");
      const data = await response.json();
      setQueue(data);
    }
  };

  const handleCreatePatient = async () => {
    try {
      const response = await fetch("/api/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPatient),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const refreshedData = await response.json();
      console.log(refreshedData)
      setQueue(refreshedData);
      setShowCreatePanel(false);
    } catch (err) {
      console.error("Failed to create patient:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const triage = ["Resuscitation", "Emergent", "Urgent", "Less Urgent", "Non Urgent"];

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="floating-navbar">
        <button onClick={() => setShowCreatePanel(true)}>Create User</button>
        {selectedPatients.size > 0 && (
          <>
            <select onChange={(e) => setNewGroup(e.target.value as PatientPhase)}>
              <option value="">Move User To...</option>
              <option value={PatientPhase.TRIAGED}>Triage</option>
              <option value={PatientPhase.TREATMENT}>Treatment</option>
              <option value={PatientPhase.ADMITTED}>Admitted</option>
              <option value={PatientPhase.INVESTIGATIONS_PENDING}>Pending Investigations</option>
              <option value={PatientPhase.DISCHARGED}>Discharged</option>
            </select>
            <button onClick={handleMoveUser}>Move</button>
          </>
        )}
      </div>
      <div className={`create-patient-panel ${showCreatePanel ? "open" : ""}`}>
        <h2>Create Patient</h2>
        <label>
          Name:
          <input type="text" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
        </label>
        <label>
          Birth Date:
          <input type="date" value={newPatient.birthDate.toISOString().slice(0, 10)} onChange={(e) => setNewPatient({ ...newPatient, birthDate: new Date(e.target.value) })} />
        </label>
        <label>
          Triage Category:
          <select value={newPatient.triageCategory} onChange={(e) => setNewPatient({ ...newPatient, triageCategory: parseInt(e.target.value) as TriageCategory })}>
            <option value={TriageCategory.RESUSCITATION}>Resuscitation</option>
            <option value={TriageCategory.EMERGENT}>Emergent</option>
            <option value={TriageCategory.URGENT}>Urgent</option>
            <option value={TriageCategory.LESS_URGENT}>Less Urgent</option>
            <option value={TriageCategory.NON_URGENT}>Non Urgent</option>
          </select>
        </label>
        <button onClick={handleCreatePatient}>Create</button>
        <button onClick={() => setShowCreatePanel(false)}>Cancel</button>
      </div>
      <div className="kanban-board">
        {/* Triage */}
        <div>
          <h3>Triage</h3>
          <ul ref={triaged} className="kanban-column">
            {triagedPatient
              .map((patient, index) => (
                <label className="kanban-item" key={index}>
                  <input type="checkbox" onChange={() => handleCheckboxChange(patient.name)} />
                  <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    {patient.name}
                    <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                  </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                    {patient.status.investigations && (
                      <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                    )}
                  </span>
                </label>
              ))}
          </ul>
        </div>

        {/* Admitted */}
        <div>
          <h3>Admitted</h3>
          <ul ref={admitted} className="kanban-column">
            {
             patientsAdmitted.map((patient) => (
                <label className="kanban-item" key={patient.name}>
                  <input type="checkbox" onChange={() => handleCheckboxChange(patient.name)} />
                  <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    {patient.name}
                    <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                  </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                    {patient.status.investigations && (
                      <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                    )}
                  </span>
                </label>
              ))}
          </ul>
        </div>

        {/* Treatment */}
        <div>
          <h3>Treatment</h3>
          <ul ref={treatment} className="kanban-column">
            {treatmentPatient
              .map((patient) => (
                <label className="kanban-item" key={patient.name}>
                  <input type="checkbox" onChange={() => handleCheckboxChange(patient.name)} />
                  <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    {patient.name}
                    <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                  </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                    {patient.status.investigations && (
                      <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                    )}
                  </span>
                </label>
              ))}
          </ul>
        </div>

        {/* Pending Investigations */}
        <div>
          <h3>Pending Investigations</h3>
          <ul ref={pendingInvestigation} className="kanban-column">
            {pendingInvestigationPatient
              .map((patient) => (
                <label className="kanban-item" key={patient.name}>
                  <input type="checkbox" onChange={() => handleCheckboxChange(patient.name)} />
                  <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    {patient.name}
                    <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                  </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                    {patient.status.investigations && (
                      <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                    )}
                  </span>
                </label>
              ))}
          </ul>
        </div>

        {/* Discharged */}
        <div>
          <h3>Discharged</h3>
          <ul ref={discharged} className="kanban-column">
            {dischargedPatient
              .map((patient) => (
                <label className="kanban-item" key={patient.name}>
                  <input type="checkbox" onChange={() => handleCheckboxChange(patient.name)} />
                  <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    {patient.name}
                    <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                  </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                    {patient.status.investigations && (
                      <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                    )}
                  </span>
                </label>
              ))}
          </ul>
        </div>

        {/* Registered */}
        <div>
          <h3>Registered</h3>
          <ul ref={registered} className="kanban-column">
            {registeredPatient
              .map((patient) => (
                <label className="kanban-item" key={patient.name}>
                  <input type="checkbox" onChange={() => handleCheckboxChange(patient.name)} />
                  <span style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                    {patient.name}
                    <Badge label={triage[patient.triageCategory - 1]} color={getBadgeStyle(patient.triageCategory)} />
                  </span>
                  <span style={{ display: "flex", width: "100%", gap: "5px", justifyContent: "flex-end" }}>
                    {patient.status.investigations && (
                      <><Badge label={patient.status.investigations.imaging + ' imaging'} color={getBadgeStyle(patient.status.investigations.imaging)} /><Badge label={patient.status.investigations.labs + ' labs'} color={getBadgeStyle(patient.status.investigations.labs)} /></>
                    )}
                  </span>
                </label>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}




