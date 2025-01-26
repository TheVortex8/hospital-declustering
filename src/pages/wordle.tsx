import React, { useState, useEffect } from "react";
import "../styles/wordle.css";

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;
const WORDS = [
  "APPLE", "BERRY", "CHERRY", "DATES", "ELDER", 
  "FIGGY", "GRAPE", "HONEY", "IVORY", "JUMPY", 
  "KITES", "LEMON", "MANGO", "NUTTY", "OLIVE", 
  "PEACH", "QUICK", "RAISE", "SUGAR", "TANGO"
];

const TARGET_WORD = WORDS[Math.floor(Math.random() * WORDS.length)];

const App: React.FC = () => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [attempts, setAttempts] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<number[]>([]);

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem("leaderboard");
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }, [leaderboard]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= WORD_LENGTH) {
      setCurrentGuess(value);
    }
  };

  const handleSubmit = () => {
    if (currentGuess.length === WORD_LENGTH && !gameOver) {
      const newAttempts = [...attempts, currentGuess];
      setAttempts(newAttempts);

      if (currentGuess === TARGET_WORD) {
        setWin(true);
        setGameOver(true);
        setScore(score + 1);
        setLeaderboard([...leaderboard, score + 1]);
      } else if (newAttempts.length >= MAX_ATTEMPTS) {
        setGameOver(true);
      }

      setCurrentGuess("");
    }
  };

  const getLetterClass = (letter: string, index: number) => {
    if (!TARGET_WORD.includes(letter)) return "bg-gray-400"; // Not in word
    if (TARGET_WORD[index] === letter) return "bg-green-500"; // Correct position
    return "bg-yellow-500"; // Wrong position
  };

  return (
    <div className="body">
      <button
      style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#00796b',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={() => window.location.href = '/games'}
    >
      Back
    </button>
      <h1 className="h1">Wordle Clone</h1>

      <div className="container">
        <div className="grid grid-rows-6 gap-2">
          {Array.from({ length: MAX_ATTEMPTS }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                const letter = attempts[rowIndex]?.[colIndex] || "";
                const letterClass =
                  attempts[rowIndex] && getLetterClass(letter, colIndex);
                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12 flex items-center justify-center border ${letterClass} text-white font-bold text-lg`}
                  >
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {!gameOver && (
        <div className="mt-6">
          <input
            type="text"
            value={currentGuess}
            onChange={handleInputChange}
            className="border p-2 text-center uppercase w-48 wordle-input"
            maxLength={WORD_LENGTH}
            disabled={gameOver}
          />
          <button
            onClick={handleSubmit}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded wordle-button"
          >
            Submit
          </button>
        </div>
      )}

      {gameOver && (
        <div className="mt-6 text-center">
          {win ? (
            <p className="text-green-500 font-bold text-xl">Congratulations! You guessed the word!</p>
          ) : (
            <p className="text-red-500 font-bold text-xl">Game Over! The word was {TARGET_WORD}</p>
          )}
          <button
            onClick={() => {
              setAttempts([]);
              setGameOver(false);
              setWin(false);
            }}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Restart
          </button>
        </div>
      )}

      <div className="mt-6 text-center">
        <h2 className="h1">{localStorage.getItem("patientName")} - Score: {score}</h2>
        
      </div>
    </div>
  );
};

export default App;
