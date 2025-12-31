import { useState } from "react";

function FeedbackForm({ onAddFeedback }) {
  const [feedback, setFeedback] = useState("");

  const API_URL = "https://intern-feedback-backend.onrender.com";

  const handleSubmit = async (e) => {
  console.log("🟢 SUBMIT CLICKED");

  e.preventDefault();

  if (!feedback || feedback.trim() === "") {
    console.log("🔴 Text is empty");
    return;
  }

  console.log("🟢 Text:", feedback);

  try {
    const response = await fetch(`${API_URL}/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: feedback }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("🟢 Response status:", response.status);
  } catch (error) {
    console.error("🔴 Fetch error:", error);
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


const styles = {
  container: {
    marginTop: "20px"
  },
  textarea: {
    width: "100%",
    height: "80px",
    padding: "10px"
  },
  button: {
    marginTop: "10px",
    padding: "8px 15px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};
}
export default FeedbackForm;
