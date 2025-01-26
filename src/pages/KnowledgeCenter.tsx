import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; 

const KnowledgeCenter = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Understanding Triage", endpoint: "/triageInfo" },
    { label: "Understanding Medical Tests", endpoint: "/medicalTestInfo" },
    { label: "The Emergency Care Process", endpoint: "/emergencyCareProcessInfo" },
    { label: "What to Do Before and After an ER Visit", endpoint: "/ERVisitInfo" },
    { label: "Healthy Lifestyle", endpoint: "/healthyLifeStyleInfo" },
    { label: "Resources and Useful Links", endpoint: "/resourcesInfo" },
    { label: "Test Your Knowledge", endpoint: "/test" },
  ];

  return (
    
    <div
    
      className="container"
      style={{
      padding: "40px 20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      overflowY: "auto",
      backgroundColor: "#f4f7fa", // Softer background
      }}
    >
    <button
      style={{
      position: "absolute",
      top: "20px",
      left: "20px",
      padding: "10px 20px",
      fontSize: "16px",
      color: "#ffffff",
      backgroundColor: "#00796b",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      }}
      onClick={() => navigate("/dashboard")}
    >
      Back
    </button>
  
      <h1 style={{
        fontSize: '2rem',
        marginTop: '1em',
        marginBottom: '1.5rem',
        textAlign: 'center',
      }}>
        Knowledge Center
      </h1>
      <div className="w-full max-w-5xl">
      {menuItems.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.endpoint)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Changed to flex-start for left alignment
            paddingLeft: "5px",
            backgroundColor: "white",
            minHeight: "100px",
            width: "100%",
            borderBottom: index === menuItems.length - 1 ? "none" : "1px solid #e5e7eb",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
            borderRadius: "8px",
            cursor: "pointer",
            marginBottom: "16px",
            transition: "background-color 0.3s",
            textAlign: "left",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#EBF5FF";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "white";
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <span
              style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "#374151",
          lineHeight: 1.25,
          paddingRight: "24px",
              }}
              onMouseOver={(e) => {
          e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseOut={(e) => {
          e.currentTarget.style.textDecoration = "none";
              }}
            >
              {item.label}
            </span>
          </div>
          <ChevronRight
            style={{
              color: "#3B82F6",
              opacity: 0.7,
              marginLeft: "auto",
              width: "36px",
              height: "36px",
              strokeWidth: 2
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
          />
        </div>
      ))}
      </div>
    </div>
  );
};

export default KnowledgeCenter;
