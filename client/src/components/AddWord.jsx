import { useState } from "react";

export default function AddWord() {
  const [english, setEnglish] = useState("");
  const [spanish, setSpanish] = useState("");
  const [group, setGroup] = useState("default");

  async function add() {
    await fetch("http://localhost:5000/words", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ english, spanish, wordGroup: group })
    });
    setEnglish("");
    setSpanish("");
  }

  return (
    <div>
      <h2>Add Word</h2>
      <input placeholder="English" value={english} onChange={e => setEnglish(e.target.value)} />
      <input placeholder="Spanish" value={spanish} onChange={e => setSpanish(e.target.value)} />
      <input placeholder="Group" value={group} onChange={e => setGroup(e.target.value)} />
      <button onClick={add}>Add</button>
    </div>
  );
}
