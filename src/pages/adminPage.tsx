import React from "react";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import logo from "../assets/logo.png";
import "../styles/adminPage.css";
import { Badge } from "../components/Badge";

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
    <div className="admin-container">
    <div className="kanban-board">
      {/* Triage */}
      <div className="group-container">
        <h3 className="group-title">Registered</h3>
        <ul ref={triageList} className="kanban-column">
          {triage.map((todo) => (
            <li className="kanban-item" key={todo}>
              {todo}
              <div className="badge-container">
                <Badge color="red" text="Critical" />
                <Badge color="red" text="Critical" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Admitted */}
      <div className="group-container">
      <h3 className="group-title">Triaged</h3>
        <ul ref={admittedList} className="kanban-column">
          {admitted.map((admittedPatient) => (
            <li className="kanban-item" key={admittedPatient}>
              {admittedPatient}
              <div className="badge-container">
                <Badge color="red" text="Critical" />
                <Badge color="red" text="Critical" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Treatment */}
      <div className="group-container">
      <h3 className="group-title">Investigations Pending</h3>
        <ul ref={treatmentList} className="kanban-column">
          {treatment.map((treatmentPatient) => (
            <li className="kanban-item" key={treatmentPatient}>
              {treatmentPatient}
              <div className="badge-container">
                <Badge color="red" text="Critical" />
                <Badge color="red" text="Critical" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Pending Investigations */}
      <div className="group-container">
      <h3 className="group-title">Treatment</h3>
        <ul ref={investigationsPendingList} className="kanban-column">
          {investigationsPending.map((pendingInvestigation) => (
            <li className="kanban-item" key={pendingInvestigation}>
              {pendingInvestigation}
              <div className="badge-container">
                <Badge color="red" text="Critical" />
                <Badge color="red" text="Critical" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Discharged */}
      <div className="group-container">
      <h3 className="group-title">Admitted</h3>
        <ul ref={dischargedList} className="kanban-column">
          {discharged.map((dischargedPatient) => (
            <li className="kanban-item" key={dischargedPatient}>
              {dischargedPatient}
              <div className="badge-container">
                <Badge color="red" text="Critical" />
                <Badge color="red" text="Critical" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Registered */}    
      <div className="group-container">
      <h3 className="group-title">Discharged</h3>
        <ul ref={registeredList} className="kanban-column">
          {registered.map((registeredPatient) => (
            <li className="kanban-item" key={registeredPatient}>
              {registeredPatient}
              <div className="badge-container">
                <Badge color="red" text="Critical" />
                <Badge color="red" text="Critical" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
  );
}
