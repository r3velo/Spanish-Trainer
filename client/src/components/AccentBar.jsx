export default function AccentBar({ setInput, input }) {
  const accents = ["á","é","í","ó","ú","ü","ñ","¿","¡"];

  function insert(letter) {
    setInput(input + letter);
  }

  return (
    <div>
      {accents.map(a => (
        <button key={a} onClick={() => insert(a)}>
          {a}
        </button>
      ))}
    </div>
  );
}
