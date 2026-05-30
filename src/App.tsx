import "./App.css";
import Balloon from "./components/Balloon";
import { alphabets } from "./utils/alphabet";

const randomLetter =
  alphabets[Math.floor(Math.random() * alphabets.length)];

function App() {
  return (
    <div className="app">
      <Balloon letter={randomLetter} x={200} />
    </div>
  );
}

export default App;