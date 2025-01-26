import React from "react";

const HealthyLifeStyleInfo: React.FC = () => {
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
          Healthy Lifestyle
        </h2>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          Tips for a Healthy Lifestyle:
        </h3>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Stay Active
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>Aim for at least 30 minutes of activity most days.</li>
        </ul>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Eat a Balanced Diet
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>Include a variety of fruits, vegetables, whole grains, and lean proteins.</li>
          <li>Try to limit sugary snacks and processed foods.</li>
        </ul>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Get Enough Sleep
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>Aim for 7-8 hours of sleep each night to help your body recharge.</li>
        </ul>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Drink Water
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>Stay hydrated by drinking plenty of water throughout the day.</li>
        </ul>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Stop Smoking
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>Quitting smoking improves your overall health and reduces the risk of many conditions.</li>
        </ul>
        <h4 style={{ fontSize: "1rem", fontWeight: "bold", color: "#374151" }}>
          Limit Alcohol
        </h4>
        <ul style={{ marginBottom: "20px" }}>
          <li>Try to keep alcohol consumption moderate to improve your health.</li>
        </ul>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          Why it Matters:
        </h3>
        <ul>
          <li>
            <strong>Small changes</strong> can make a <strong>big difference</strong> in your health.
          </li>
          <li>
            <strong>Prevention</strong> is key to staying well and avoiding future visits to the ER.
          </li>
        </ul>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#6b7280",
            marginTop: "20px",
            lineHeight: "1.4",
          }}
        >
          <strong>*Not all recommendations may apply to you*</strong>
          <br />
          Please check with your community pharmacist or family doctor.
        </p>
      </div>
    </div>
  );
};

export default HealthyLifeStyleInfo;
