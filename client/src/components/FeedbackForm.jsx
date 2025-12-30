import { useState } from "react";

function FeedbackForm({ onAddFeedback }) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
  if (feedback.trim() === "") {
    alert("Please enter feedback");
    return;
  }

  await fetch("http://localhost:5000/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: feedback })
  });

  setFeedback("");
};


  return (
    <div style={styles.container}>
      <textarea
        placeholder="Enter today's work / feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        style={styles.textarea}
      />
      <br />
      <button onClick={handleSubmit} style={styles.button}>
        Submit
      </button>
    </div>
  );
}

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

export default FeedbackForm;
