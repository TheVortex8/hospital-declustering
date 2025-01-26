import React from "react";

const MedicalTestInfo: React.FC = () => {
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
          Understanding Medical Tests
        </h2>
        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          Why do tests?
        </h3>
        <p style={{ marginBottom: "20px" }}>
          Medical tests help doctors <strong>understand what’s happening</strong> in your body.
        </p>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          Examples of tests
        </h3>
        <ul style={{ marginBottom: "20px" }}>
          <li>
            <strong>Blood tests:</strong> Helps doctors understand your overall health and find out what might be causing your symptoms.
          </li>
          <li>
            <strong>X-Rays:</strong> Take pictures of bones and organs.
          </li>
          <li>
            <strong>CT Scan:</strong> Creates detailed images of your body.
          </li>
          <li>
            <strong>Ultrasound:</strong> Uses sound waves to create images of organs.
          </li>
          <li>
            <strong>EKG:</strong> Measures your heart’s electrical activity.
          </li>
          <li>
            <strong>Urine tests:</strong> Analyze a sample of your urine.
          </li>
        </ul>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          Why These Tests Matter
        </h3>
        <ul>
          <li>
            <strong>Tests help find the right diagnosis</strong> quickly so you can get the best care.
          </li>
          <li>
            <strong>Results help doctors decide the next steps</strong> in your treatment.
          </li>
          <li>
            <strong>Most tests don’t take long</strong> and help doctors make sure you’re getting the right care.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MedicalTestInfo;
