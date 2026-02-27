import express from "express";
import cors from "cors";
import { initDB } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = await initDB();

app.get("/words", async (req, res) => {
  const words = await db.all("SELECT * FROM words");
  res.json(words);
});

app.get("/groups", async (req, res) => {
  const groups = await db.all("SELECT DISTINCT wordGroup FROM words");
  res.json(groups.map(g => g.wordGroup));
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
  const { english, spanish, correctStreak, timesWrong, lastReviewed } = req.body;
  await db.run(
    `UPDATE words 
     SET english=?, spanish=?, correctStreak=?, timesWrong=?, lastReviewed=? 
     WHERE id=?`,
    english,
    spanish,
    correctStreak,
    timesWrong,
    lastReviewed,
    req.params.id
  );
  res.json({ success: true });
});

app.delete("/words/:id", async (req, res) => {
  await db.run("DELETE FROM words WHERE id=?", req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running on port 5000"));
