import React from "react";

const ResourcesInfo: React.FC = () => {
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
          Resources and Helpful Links
        </h2>

        <h3 style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#00796b" }}>
          Trusted Health Resources
        </h3>
        <ul style={{ marginBottom: "20px" }}>
          <li>
            <strong>Health Canada</strong>
            <ul>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.canada.ca/en/health-canada"
                  style={{ color: "#1d4ed8", textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.canada.ca/en/health-canada
                </a>
              </li>
              <li>Reliable information on health guidelines, vaccines, and prevention.</li>
            </ul>
          </li>
          <li>
            <strong>Kids Health (For parents and caregivers)</strong>
            <ul>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.kidshealth.org"
                  style={{ color: "#1d4ed8", textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.kidshealth.org
                </a>
              </li>
              <li>A trusted resource for advice on children’s health, safety, and development.</li>
            </ul>
          </li>
          <li>
            <strong>Diabetes Canada</strong>
            <ul>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.diabetes.ca"
                  style={{ color: "#1d4ed8", textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.diabetes.ca
                </a>
              </li>
              <li>Trusted resources on managing diabetes, prevention, and healthy living.</li>
            </ul>
          </li>
          <li>
            <strong>Your Community Pharmacist</strong>
            <ul>
              <li>
                Pharmacists are a trusted source for advice on medications, over-the-counter treatments, and general health inquiries.
              </li>
              <li>
                Visit your local pharmacy for guidance on medication, symptom relief, and wellness tips.
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ResourcesInfo;
