
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import "../style/AdminPage.css";

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

  const [queueList, queueItems] = useDragAndDrop<HTMLUListElement, string>(
    patientsInQueue,
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  const [registeredList, registeredItems] = useDragAndDrop<HTMLUListElement, string>(
    registeredPatients,
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  const [investigationPendingList, investigationPending] = useDragAndDrop<HTMLUListElement, string>(
    [],
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  const [treatmentList, treatmentItems] = useDragAndDrop<HTMLUListElement, string>(
    [],
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  const [admittedList, admittedItems] = useDragAndDrop<HTMLUListElement, string>(
    [],
    { group: "Patients", dragHandle: ".kanban-handle" }
  );

  return (
    <div className="kanban-board">

      {/* Patients in Queue */}
      <div className="kanban-column">
        <h2>Patients in Queue</h2>
        <ul ref={queueList} className="kanban-list">
          {queueItems.map((item) => (
            <li key={item} className="kanban-item kanban-handle">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Registered Patients */}
      <div className="kanban-column">
        <h2>Registered Patients</h2>
        <ul ref={registeredList} className="kanban-list">
          {registeredItems.map((item) => (
            <li key={item} className="kanban-item kanban-handle">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Investigation Pending */}
      <div className="kanban-column">
        <h2>Investigation Pending</h2>
        <ul ref={investigationPendingList} className="kanban-list">
          {investigationPending.map((item) => (
            <li key={item} className="kanban-item kanban-handle">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Treatment */}
      <div className="kanban-column">
        <h2>Treatment</h2>
        <ul ref={treatmentList} className="kanban-list">
          {treatmentItems.map((item) => (
            <li key={item} className="kanban-item kanban-handle">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Admitted */}
      <div className="kanban-column">
        <h2>Admitted</h2>
        <ul ref={admittedList} className="kanban-list">
          {admittedItems.map((item) => (
            <li key={item} className="kanban-item kanban-handle">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
