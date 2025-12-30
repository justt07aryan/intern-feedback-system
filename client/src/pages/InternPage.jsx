import { useEffect, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";

function InternPage() {
  const [feedbackList, setFeedbackList] = useState([]);

  const fetchFeedbacks = async () => {
    const res = await fetch("https://intern-feedback-backend.onrender.com/feedback");
    const data = await res.json();
    setFeedbackList(data);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const addFeedback = async (text) => {
    await fetch("https://intern-feedback-backend.onrender.com/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    fetchFeedbacks();
  };

  const deleteFeedback = async (id) => {
    await fetch(`https://intern-feedback-backend.onrender.com/feedback/${id}`, {
      method: "DELETE"
    });

    fetchFeedbacks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Intern Dashboard</h3>
      <FeedbackForm onAddFeedback={addFeedback} />

      <ul>
        {feedbackList.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => deleteFeedback(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InternPage;
