import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { KanbanBoard } from "../components/Kanbanboard";
export function App() {
  const patientsInQueue = [
    "John Doe",
    "Jane Smith",
    "Emily Davis",
    "James Miller",
    "Sophia Wilson",
    "Robert Brown",
  ];

  const registeredPatients = [
    "Anna Baker",
    "Chris Evans",
    "Diana Scott",
  ];

  const [patientTriaged, triagedPatientTodos] = useDragAndDrop<HTMLUListElement, string>(
    patientsInQueue,
    { group: "Triaged", dragHandle: ".kanban-handle" }
  );

  const [registeredList, registered] = useDragAndDrop<HTMLUListElement, string>(
    registeredPatients,
    { group: "Registered", dragHandle: ".kanban-handle" }
  );

  const [investigationPendingList, investigationPending] = useDragAndDrop<HTMLUListElement, string>(
    [],
    { group: "InvestigationPending", dragHandle: ".kanban-handle" }
  );

  const [treatmentList, treatment] = useDragAndDrop<HTMLUListElement, string>(
    [],
    { group: "Treatment", dragHandle: ".kanban-handle" }
  );

  const [admittedList, admitted] = useDragAndDrop<HTMLUListElement, string>(
    [],
    { group: "Admitted", dragHandle: ".kanban-handle" }
  );

  return (
    <KanbanBoard
      patientTriaged={patientTriaged}
      triagedPatientTodos={triagedPatientTodos}
      registeredList={registeredList}
      registered={registered}
      investigationPendingList={investigationPendingList}
      investigationPending={investigationPending}
      treatmentList={treatmentList}
      treatment={treatment}
      admittedList={admittedList}
      admitted={admitted}
    />
  );
}
