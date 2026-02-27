import express from "express";
import cors from "cors";
import { initDB } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = await initDB();

app.get("/words/:group", async (req, res) => {
  const words = await db.all(
    "SELECT * FROM words WHERE wordGroup = ?",
    req.params.group
  );
  res.json(words);
});

app.post("/words", async (req, res) => {
  const { english, spanish, wordGroup } = req.body;
  await db.run(
    "INSERT INTO words (english, spanish, wordGroup) VALUES (?, ?, ?)",
    english,
    spanish,
    wordGroup
  );
  res.json({ success: true });
});

app.put("/words/:id", async (req, res) => {
  const { correctStreak, timesWrong, lastReviewed } = req.body;
  await db.run(
    "UPDATE words SET correctStreak=?, timesWrong=?, lastReviewed=? WHERE id=?",
    correctStreak,
    timesWrong,
    lastReviewed,
    req.params.id
  );
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on port 5000"));
