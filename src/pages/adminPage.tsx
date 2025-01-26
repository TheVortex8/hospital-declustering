import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import "../styles/adminPage.css";

export function AdminPage() {
  // Separate initial data for each list
  const patientsTriaged = [
    "John Doe",
    "Jane Smith",
    "Emily Davis",
    "James Miller",
    "Sophia Wilson",
    "Michael Brown",
  ];

  const admittedPatients = ["William Scott", "Emma Thomas"];
  const treatmentPatients = ["Oliver Harris"];
  const dischargedPatients = ["Sophia Johnson"];
  const pendingInvestigations = ["Ethan Walker"];
  const registeredPatients = ["Anna Baker", "Chris Evans"];

  // Hooks for each list
  const [triageList, triage] = useDragAndDrop<HTMLUListElement, string>(
    patientsTriaged,
    { group: "todoList" }
  );

  const [admittedList, admitted] = useDragAndDrop<HTMLUListElement, string>(
    admittedPatients,
    { group: "todoList" }
  );

  const [treatmentList, treatment] = useDragAndDrop<HTMLUListElement, string>(
    treatmentPatients,
    { group: "todoList" }
  );

  const [dischargedList, discharged] = useDragAndDrop<HTMLUListElement, string>(
    dischargedPatients,
    { group: "todoList" }
  );

  const [investigationsPendingList, investigationsPending] =
    useDragAndDrop<HTMLUListElement, string>(pendingInvestigations, {
      group: "todoList",
    });

  const [registeredList, registered] = useDragAndDrop<HTMLUListElement, string>(
    registeredPatients,
    { group: "todoList" }
  );

  return (
    <div>
    <h1>Admin Dashboard</h1>
    <div className="kanban-board">
      {/* Triage */}
      <ul ref={triageList} className="kanban-column">
        {triage.map((todo) => (
          <li className="kanban-item" key={todo}>
            {todo}
          </li>
        ))}
      </ul>

      {/* Admitted */}
      <ul ref={admittedList} className="kanban-column">
        {admitted.map((admittedPatient) => (
          <li className="kanban-item" key={admittedPatient}>
            {admittedPatient}
          </li>
        ))}
      </ul>

      {/* Treatment */}
      <ul ref={treatmentList} className="kanban-column">
        {treatment.map((treatmentPatient) => (
          <li className="kanban-item" key={treatmentPatient}>
            {treatmentPatient}
          </li>
        ))}
      </ul>

      {/* Pending Investigations */}
      <ul ref={investigationsPendingList} className="kanban-column">
        {investigationsPending.map((pendingInvestigation) => (
          <li className="kanban-item" key={pendingInvestigation}>
            {pendingInvestigation}
          </li>
        ))}
      </ul>

      {/* Discharged */}
      <ul ref={dischargedList} className="kanban-column">
        {discharged.map((dischargedPatient) => (
          <li className="kanban-item" key={dischargedPatient}>
            {dischargedPatient}
          </li>
        ))}
      </ul>

      {/* Registered */}
     
      <h3>Registered</h3>
      <div>
    
      <ul ref={registeredList} className="kanban-column">
        {registered.map((registeredPatient) => (
          <li className="kanban-item" key={registeredPatient}>
            {registeredPatient}
          </li>
        ))}
      </ul>
      </div>
    </div>
  </div>
  );
}
