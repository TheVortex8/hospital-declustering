import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import "../style/adminPage.css";

export function AdminPage() {
  const patientsInQueue = [
    "John Doe",
    "Jane Smith",
    "Emily Davis",
    "James Miller",
    "Sophia Wilson",
    "Robert Brown",
  ];

  const registeredPatients = ["Anna Baker", "Chris Evans", "Diana Scott"];

  const [patientTriaged, triagedPatientTodos] = useDragAndDrop<HTMLUListElement, string>(
    patientsInQueue,
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  const [registeredList, registered] = useDragAndDrop<HTMLUListElement, string>(
    registeredPatients,
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  const [investigationPendingList, investigationPending] = useDragAndDrop<HTMLUListElement, string>(
    [],
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  const [treatmentList, treatment] = useDragAndDrop<HTMLUListElement, string>(
    [],
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  const [admittedList, admitted] = useDragAndDrop<HTMLUListElement, string>(
    [],
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  return (
    <div className="kanban-board">
      <div className="kanban-column">
        <h2>Triaged</h2>
        <ul ref={patientTriaged}>
          {triagedPatientTodos.map((todo) => (
            <li className="kanban-item kanban-handle" key={todo}>
              {todo}
            </li>
          ))}
        </ul>
      </div>
      <div className="kanban-column">
        <h2>Registered</h2>
        <ul ref={registeredList}>
          {registered.map((done) => (
            <li className="kanban-item kanban-handle" key={done}>
              {done}
            </li>
          ))}
        </ul>
      </div>
      <div className="kanban-column">
        <h2>Investigation Pending</h2>
        <ul ref={investigationPendingList}>
          {investigationPending.map((item) => (
            <li className="kanban-item kanban-handle" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="kanban-column">
        <h2>Treatment</h2>
        <ul ref={treatmentList}>
          {treatment.map((item) => (
            <li className="kanban-item kanban-handle" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="kanban-column">
        <h2>Admitted</h2>
        <ul ref={admittedList}>
          {admitted.map((item) => (
            <li className="kanban-item kanban-handle" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
