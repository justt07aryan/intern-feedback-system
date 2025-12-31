require("dotenv").config();
const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();


const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://prismatic-tartufo-1d72dc.netlify.app"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Temporary in-memory storage
let feedbacks = [];

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Get all feedback
app.get("/feedback", (req, res) => {
  res.json(feedbacks);
});

// Add new feedback
app.post("/feedback", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Empty feedback" });
    }

    await db.collection("feedbacks").add({
      text,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Firestore error:", err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});



// Delete feedback
app.delete("/feedback/:id", (req, res) => {
  const id = Number(req.params.id);
  feedbacks = feedbacks.filter((item) => item.id !== id);
  res.json({ message: "Deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on https://intern-feedback-backend.onrender.com
`);
});