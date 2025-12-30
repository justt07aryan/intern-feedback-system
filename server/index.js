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
const PORT = 5000;

// Middlewares
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

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

    console.log("➡️ Writing to Firestore...");

    await db.collection("feedbacks").add({
      text,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ message: "Feedback saved" });
  } catch (error) {
    console.error("❌ Firestore write FAILED:", error);
    res.status(500).json({ error: "Firestore write failed" });
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