import Practice from "./components/Practice";
import AddWord from "./components/AddWord";

export default function App() {
  return (
    <div>
      <h1>Spanish Trainer</h1>
      <AddWord />
      <Practice group="default" />
    </div>
  );
}
