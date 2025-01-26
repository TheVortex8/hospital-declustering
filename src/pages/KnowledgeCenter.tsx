import React from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const KnowledgeCenter = () => {
  const navigate = useNavigate(); // Initialize navigate

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
        minHeight: "100vh",
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
      onClick={() => (window.location.href = "/knowledgeCenter")}
    >
      Back
    </button>
  
      <h1 className="text-4xl font-bold mb-16 text-center text-gray-800">
        Knowledge Center
      </h1>
      <div className="w-full max-w-5xl">
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.endpoint)} // Navigate to the endpoint
            className="flex items-center justify-between pl-10 pr-8 py-6 bg-white hover:bg-blue-50 transition-all duration-300"
            style={{
              minHeight: "100px",
              width: "100%",
              borderBottom:
                index === menuItems.length - 1 ? "none" : "1px solid #e5e7eb",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
              borderRadius: "8px",
              cursor: "pointer", // Add pointer cursor
            }}
          >
            <span
              className="text-3xl font-semibold text-gray-700 flex-grow leading-tight pr-6"
              style={{
                textDecoration: "none", // Default (no underline)
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.textDecoration = "underline"; // Add underline on hover
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.textDecoration = "none"; // Remove underline on hover out
              }}
            >
              {item.label}
            </span>
            <ChevronRight
              className="text-blue-500 opacity-70 hover:opacity-100"
              strokeWidth={2}
              size={36}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeCenter;
