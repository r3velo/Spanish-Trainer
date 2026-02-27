import { useState, useEffect } from "react";
import GroupSelector from "./components/GroupSelector";
import AddWord from "./components/AddWord";
import WordList from "./components/WordList";
import Practice from "./components/Practice";
import Stats from "./components/Stats";

export default function App() {
  const [words, setWords] = useState([]);
  const [group, setGroup] = useState("");

  async function loadWords() {
    const res = await fetch("http://localhost:5000/words");
    const data = await res.json();
    setWords(data);
  }

  useEffect(() => { loadWords(); }, []);

  const filtered = group ? words.filter(w => w.wordGroup === group) : words;

  return (
    <div className="container">
      <h1>Spanish Trainer</h1>
      <GroupSelector group={group} setGroup={setGroup} words={words} />
      <AddWord refresh={loadWords} />
      <WordList words={filtered} refresh={loadWords} />
      <Practice words={filtered} refresh={loadWords} />
      <Stats words={filtered} />
    </div>
  );
}
