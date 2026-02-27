import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function initDB() {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      english TEXT NOT NULL,
      spanish TEXT NOT NULL,
      wordGroup TEXT,
      correctStreak INTEGER DEFAULT 0,
      timesWrong INTEGER DEFAULT 0,
      lastReviewed INTEGER DEFAULT 0
    )
  `);

  return db;
}
