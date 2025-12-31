import { useState } from "react";

const API_URL = "https://intern-feedback-backend.onrender.com";

const styles = {
  container: {
    marginTop: "20px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
};

function FeedbackForm() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback.trim()) return;

    try {
      const response = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: feedback }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      setFeedback("");
      alert("Feedback submitted!");
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Submission failed");
    }
  };

  return (
    <form style={styles.container} onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter today's work / feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        style={styles.textarea}
        required
      />

      <br />

      <button type="submit" style={styles.button}>
        Submit
      </button>
    </form>
  );
}

export default FeedbackForm;
