import React from "react";

const BeforeERVisitInfo: React.FC = () => {
  return (
    <div
      className="container"
      style={{
        maxHeight: "100vh",
        padding: "20px",
        position: "relative",
        overflowY: "scroll",
        backgroundColor: "#f8f8f8",
      }}
    >
      <button
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          color: "#ffffff",
          backgroundColor: "#00796b",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => window.location.href = "/knowledgeCenter"}
      >
        Back
      </button>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#374151",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          What to Do Before and After an ER Visit
        </h2>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          Before Your ER Visit
        </h3>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Bring Important Information:
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>
            Your ID, health card, and any relevant medical records (e.g., allergies, medications).
          </li>
          <li>
            A list of your current medications, including over-the-counter ones.
          </li>
        </ul>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Prepare for Possible Waiting:
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>
            You may have to wait, but know that urgent cases are seen first.
          </li>
          <li>
            Bring something to keep you busy, like a book, music, or something to relax you.
          </li>
        </ul>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          After Your ER Visit
        </h3>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Follow Instructions:
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>
            Pay attention to the discharge instructions provided by your doctor or nurse.
          </li>
          <li>
            If given prescriptions, fill them and take as directed.
          </li>
        </ul>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Rest and Recover:
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>
            Give your body time to rest and heal. Relax and take it easy if needed.
          </li>
        </ul>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Plan for Follow-Up:
        </h4>
        <ul>
          <li>
            Schedule any follow-up appointments or tests if needed.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BeforeERVisitInfo;
