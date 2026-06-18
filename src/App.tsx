import "./App.css";
import Balloon from "./components/Balloon";
import { useEffect, useState } from "react";

import Keyboard from "../src/components/Keyboard";
import { speak } from "../src/hooks/useSpeech";

type Mode = "CAPITALS" | "SMALL" | "NUMBERS" | "MIXED";

const DATA = {
  CAPITALS: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  SMALL: "abcdefghijklmnopqrstuvwxyz".split(""),
  NUMBERS: "0123456789".split(""),
  MIXED:
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(
      ""
    ),
};

const getRandomCharacter = (mode: Mode) => {
  const chars = DATA[mode];
  return chars[Math.floor(Math.random() * chars.length)];
};

function App() {
  const [mode, setMode] = useState<Mode>("CAPITALS");
  const [targetChar, setTargetChar] = useState(
    getRandomCharacter("CAPITALS")
  );

  const [typedChar, setTypedChar] = useState("");
  const [score, setScore] = useState(0);
  const [showStars, setShowStars] = useState(false);

  const handleInput = (input: string) => {
    if (!input) return;

    setTypedChar(input);

    speak(input);

    if (input === targetChar) {
      setScore((prev) => prev + 1);

      setShowStars(true);

      setTimeout(() => {
        setShowStars(false);
      }, 1000);

      setTargetChar(getRandomCharacter(mode));
    }
  };

  useEffect(() => {
    console.log(`
███████╗███████╗████████╗██╗  ██╗██╗   ██╗██╗      █████╗ ██╗  ██╗███████╗██╗  ██╗███╗   ███╗██╗
██╔════╝██╔════╝╚══██╔══╝██║  ██║██║   ██║██║     ██╔══██╗██║ ██╔╝██╔════╝██║  ██║████╗ ████║██║
███████╗█████╗     ██║   ███████║██║   ██║██║     ███████║█████╔╝ ███████╗███████║██╔████╔██║██║
╚════██║██╔══╝     ██║   ██╔══██║██║   ██║██║     ██╔══██║██╔═██╗ ╚════██║██╔══██║██║╚██╔╝██║██║
███████║███████╗   ██║   ██║  ██║╚██████╔╝███████╗██║  ██║██║  ██╗███████║██║  ██║██║ ╚═╝ ██║██║
╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝

                         P   M
  `);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleInput(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetChar, mode]);

  useEffect(() => {
    setTargetChar(getRandomCharacter(mode));
    setTypedChar("");
  }, [mode]);

  return (
    <div className="app">
      <header className="header">
        <h1>🎈 Ayra Learns Letters..!!</h1>

        <div className="score">
          ⭐ Score: {score}
        </div>

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value="CAPITALS">Capital Letters</option>
          <option value="SMALL">Small Letters</option>
          <option value="NUMBERS">Numbers</option>
          <option value="MIXED">Mixed</option>
        </select>
      </header>

      <div className="game-area">
        <div className="target-container">
          <h2 style={{ fontSize: '35px', color: "black" }}>Find This Balloon</h2>

          <Balloon letter={targetChar} x={300} />
        </div>

        <div className="typed-section">
          <span style={{
            fontSize: '35px',
            color: 'darkgreen',
            fontWeight: 500
          }}>You Typed {typedChar}</span>

        </div>

        {showStars && (
          <div className="reward">
            ⭐⭐⭐ Great Job! ⭐⭐⭐
          </div>
        )}
      </div>

      <Keyboard onPress={handleInput} />
    </div>
  );
}

export default App;