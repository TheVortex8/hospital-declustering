import React, { useState } from "react";

export default function Feedback() {
  const [form, setForm] = useState({
    name: "",
    category: "General Experience",
    feedback: "",
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rating) => {
    setForm((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Feedback:", form);
    setForm({ name: "", category: "General Experience", feedback: "", rating: 0 });
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f4f9",
    },
    form: {
      backgroundColor: "#fff",
      padding: "20px",
      width: "100%",
      maxWidth: "400px",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
      fontSize: "0.9rem",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
    },
    textarea: {
      width: "95%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
      resize: "none",
      height: "80px",
    },
    select: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "1rem",
    },
    rating: {
      display: "flex",
      gap: "5px",
      marginBottom: "20px",
    },
    star: (isSelected) => ({
      fontSize: "1.5rem",
      cursor: "pointer",
      color: isSelected ? "#f39c12" : "#ddd",
      transition: "color 0.3s",
    }),
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  return (
    <div style={styles.container}>
      <button
      style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#00796b',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={() => window.location.href = '/dashboard'}
    >
      Back
    </button>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.header}>
          <h1>Patient Feedback</h1>
          <p>We value your feedback!</p>
        </div>

        <label style={styles.label} htmlFor="name">
          Your Name
        </label>
        <b>{localStorage.getItem('patientName')}</b>

        <label style={styles.label} htmlFor="category">
          Feedback Category
        </label>
        <select
          id="category"
          name="category"
          value={form.category}
          onChange={handleInputChange}
          style={styles.select}
        >
          <option>General Experience</option>
          <option>Service Quality</option>
          <option>Staff Attitude</option>
          <option>Facilities</option>
        </select>

        <label style={styles.label} htmlFor="feedback">
          Your Feedback
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={form.feedback}
          onChange={handleInputChange}
          placeholder="Please share your experience with us..."
          style={styles.textarea}
        />

        <label style={styles.label}>Rate your experience</label>
        <div style={styles.rating}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={styles.star(form.rating >= star)}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <button
          type="submit"
          style={styles.button}
          onClick={() => alert('Message sent! Thank you for your feedback!')}
          onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
