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
app.use(cors());
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
    console.log("➡️ POST /feedback HIT");
    console.log("➡️ Request body:", req.body);

    const newFeedback = {
      text: req.body.text,
      createdAt: new Date()
    };

    console.log("➡️ Writing to Firestore...");

    const docRef = await db.collection("feedbacks").add(newFeedback);

    console.log("✅ Firestore write SUCCESS, ID:", docRef.id);

    res.status(201).json({ id: docRef.id, ...newFeedback });
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
  console.log(`Server running on http://localhost:${PORT}`);
});
