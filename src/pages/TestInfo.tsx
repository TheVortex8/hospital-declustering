import React, { useState } from "react";

const TestInfo: React.FC = () => {
  const questions = [
    {
      question: "What is the purpose of Triage?",
      options: [
        "To prioritize patients based on the urgency of their condition",
        "To provide a detailed diagnosis of all patients",
        "To treat all patients in the order they arrive",
        "To perform medical tests on every patient immediately",
      ],
      answer: "To prioritize patients based on the urgency of their condition",
    },
    {
      question: "Which of the following is a reason why Triage is helpful in the ER?",
      options: [
        "It allows all patients to be treated in the order they arrive.",
        "It ensures that urgent cases are seen first while no one is forgotten.",
        "It guarantees no waiting times for patients.",
        "It provides immediate treatment to everyone, regardless of urgency.",
      ],
      answer: "It ensures that urgent cases are seen first while no one is forgotten.",
    },
    {
      question: "Which of these lifestyle tips is recommended to help prevent future ER visits?",
      options: [
        "Limit physical activity to reduce risk of injury",
        "Drink sugary drinks to maintain energy levels",
        "Stay active and aim for at least 30 minutes of exercise most days",
        "Skip meals to control weight",
      ],
      answer: "Stay active and aim for at least 30 minutes of exercise most days",
    },
    {
      question: "What is the main purpose of medical tests in the Emergency Room?",
      options: [
        "To delay treatment",
        "To understand what’s happening in the patient’s body",
        "To ensure patients are kept in the hospital for longer",
        "To increase hospital revenue",
      ],
      answer: "To understand what’s happening in the patient’s body",
    },
    {
      question: "What should you bring to the ER before your visit?",
      options: [
        "A friend to assist with the medical assessment",
        "Your medical bills",
        "A blanket and snacks",
        "Your ID, health card, and a list of your current medications",
      ],
      answer: "Your ID, health card, and a list of your current medications",
    },
    {
      question: "What should you do after your ER visit?",
      options: [
        "Start exercising immediately to recover",
        "Ignore the discharge instructions",
        "Rest, recover, and follow the doctor’s instructions",
        "Skip any follow-up appointments",
      ],
      answer: "Rest, recover, and follow the doctor’s instructions",
    },
    {
      question: "What is an important lifestyle tip to improve health and prevent ER visits?",
      options: [
        "Limit all food intake",
        "Drink soda frequently",
        "Stay active and aim for 30 minutes of exercise most days",
        "Avoid drinking water",
      ],
      answer: "Stay active and aim for 30 minutes of exercise most days",
    },
    {
      question: "Triage ensures that urgent cases are treated first, and no one is forgotten.",
      options: ["True", "False"],
      answer: "True",
    },
    {
      question: "A CT Scan is used to analyze urine samples.",
      options: ["True", "False"],
      answer: "False",
    },
    {
      question:
        "Community pharmacists can provide advice on medications, over-the-counter treatments, and general health inquiries.",
      options: ["True", "False"],
      answer: "True",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!selectedOption) {
      setErrorMessage("Please select an answer before submitting.");
      return;
    }

    setErrorMessage(null); // Clear error message if an answer is selected

    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selection for the next question
    } else {
      setQuizCompleted(true); // Mark quiz as completed
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
    setErrorMessage(null);
    setShowAllAnswers(false);
  };

  const handleShowAnswers = () => {
    setShowAllAnswers(true);
  };

  return (
    <div
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
        onClick={() => window.location.href = "/dashboard"}
      >
        Back
      </button>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          margin: "50px auto",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {quizCompleted ? (
          showAllAnswers ? (
            <div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>
                All Answers
              </h2>
              <ul style={{ textAlign: "left", marginBottom: "20px" }}>
                {questions.map((q, index) => (
                  <li key={index} style={{ marginBottom: "10px" }}>
                    <strong>Question {index + 1}:</strong> {q.question}
                    <br />
                    <strong
                      style={{
                        display: "inline-block",
                        backgroundColor: "#d1fad8", // Highlight in green
                        padding: "5px 10px",
                        borderRadius: "5px",
                        color: "#065f46", // Dark green text
                      }}
                    >
                      Correct Answer: {q.answer}
                    </strong>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleRestart}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#1f2937",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Restart Quiz
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>
                Quiz Completed!
              </h2>
              <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
                Your Score: {score} / {questions.length}
              </p>
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                <button
                  onClick={handleRestart}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#1f2937",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Restart Quiz
                </button>
                <button
                  onClick={handleShowAnswers}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#00796b",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Show All Answers
                </button>
              </div>
            </div>
          )
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Test Your Knowledge</h2>
              <p style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <hr style={{ margin: "10px 0", border: "none", borderBottom: "2px solid #e5e7eb" }} />
            <p
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              {questions[currentQuestionIndex].question}
            </p>
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "10px", fontWeight: "bold" }}>
                {errorMessage}
              </p>
            )}
            <form>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "5px",
                    padding: "10px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => setSelectedOption(option)}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedOption === option}
                    onChange={() => setSelectedOption(option)}
                    style={{
                      marginRight: "10px",
                    }}
                  />
                  <label style={{ fontSize: "1rem", color: "#374151" }}>{option}</label>
                </div>
              ))}
            </form>
            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#1f2937",
                color: "#ffffff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                marginTop: "20px",
              }}
            >
              Submit Answer
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TestInfo;
