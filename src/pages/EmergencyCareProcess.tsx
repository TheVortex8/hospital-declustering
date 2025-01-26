import React from "react";

const EmergencyCareProcess: React.FC = () => {
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
          The Emergency Care Process
        </h2>
        <p style={{ marginBottom: "20px" }}>
          The process helps ensure you get the <strong>right care as quickly as possible</strong>.
        </p>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          Steps of Emergency Care
        </h3>
        <ol style={{ marginBottom: "20px" }}>
          <li>
            <strong>Arrival and Triage:</strong> A nurse will assess your condition to decide how urgently you need care.
          </li>
          <li>
            <strong>Registration:</strong> You’ll register your basic information (name, date of birth, etc.).
          </li>
          <li>
            <strong>The First Wait:</strong> You might need to wait until it’s your turn for treatment based on the urgency of your condition.
          </li>
          <li>
            <strong>Initial Assessment:</strong> A doctor or nurse will examine you and may order tests (like blood work, X-rays).
          </li>
          <li>
            <strong>Treatment and Next Steps:</strong> Based on your evaluation and test results, treatment options will be discussed, and a plan is made for the next steps.
          </li>
        </ol>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          Why This Process Helps
        </h3>
        <ul>
          <li>
            <strong>Provides efficient care:</strong> Ensures timely treatment.
          </li>
          <li>
            <strong>Our team is here to guide you through each step:</strong> Offers clarity and support.
          </li>
          <li>
            <strong>Our goal is to make sure you feel cared for:</strong> Ensures you are supported throughout your visit.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmergencyCareProcess;
