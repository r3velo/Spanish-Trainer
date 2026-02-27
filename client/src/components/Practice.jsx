import { useEffect, useState } from "react";
import AccentBar from "./AccentBar";

export default function Practice({ group }) {
  const [words, setWords] = useState([]);
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/words/${group}`)
      .then(res => res.json())
      .then(data => {
        setWords(data);
        pickWord(data);
      });
  }, []);

  function calculateWeight(word) {
    return (
      word.timesWrong * 2 +
      ((Date.now() - word.lastReviewed) / 86400000) * 0.3 -
      word.correctStreak * 1.5 +
      Math.random()
    );
  }

  function pickWord(list) {
    if (!list.length) return;
    const sorted = [...list].sort(
      (a, b) => calculateWeight(b) - calculateWeight(a)
    );
    setCurrent(sorted[0]);
  }

  async function submit() {
    if (!current) return;

    let streak = current.correctStreak;
    let wrong = current.timesWrong;

    if (input === current.spanish) {
      streak++;
    } else {
      streak = 0;
      wrong++;
    }

    await fetch(`http://localhost:5000/words/${current.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correctStreak: streak,
        timesWrong: wrong,
        lastReviewed: Date.now()
      })
    });

    const updated = words.map(w =>
      w.id === current.id
        ? { ...w, correctStreak: streak, timesWrong: wrong }
        : w
    );

    setWords(updated);
    setInput("");
    pickWord(updated);
  }

  if (!current) return <p>No words yet.</p>;

  return (
    <div>
      <h2>{current.english}</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <AccentBar setInput={setInput} input={input} />
      <button onClick={submit}>Submit</button>
      <p>Streak: {current.correctStreak}/5</p>
    </div>
  );
}
