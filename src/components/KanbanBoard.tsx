import React from "react";

interface KanbanBoardProps {
  patientTriaged: React.Ref<HTMLUListElement>;
  triagedPatientTodos: string[];
  registeredList: React.Ref<HTMLUListElement>;
  registered: string[];
  investigationPendingList: React.Ref<HTMLUListElement>;
  investigationPending: string[];
  treatmentList: React.Ref<HTMLUListElement>;
  treatment: string[];
  admittedList: React.Ref<HTMLUListElement>;
  admitted: string[];
}

export function KanbanBoard({
  patientTriaged,
  triagedPatientTodos,
  registeredList,
  registered,
  investigationPendingList,
  investigationPending,
  treatmentList,
  treatment,
  admittedList,
  admitted,
}: KanbanBoardProps) {
  return (
    <div className="kanban-board">
      <ul ref={patientTriaged}>
        {triagedPatientTodos.map((todo) => (
          <li className="kanban-item" key={todo}>
            {todo}
          </li>
        ))}
      </ul>
      <ul ref={registeredList}>
        {registered.map((done) => (
          <li className="kanban-item" key={done}>
            {done}
          </li>
        ))}
      </ul>
      <ul ref={investigationPendingList}>
        {investigationPending.map((item) => (
          <li className="kanban-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <ul ref={treatmentList}>
        {treatment.map((item) => (
          <li className="kanban-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
      <ul ref={admittedList}>
        {admitted.map((item) => (
          <li className="kanban-item" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
