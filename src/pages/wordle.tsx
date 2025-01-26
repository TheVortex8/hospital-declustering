import React, { useState, useEffect } from 'react';

const words = ['APPLE', 'BEACH', 'CLOUD', 'DANCE', 'EAGLE', 'FLAME', 'GRAPE', 'HOUSE', 'IVORY', 'JELLY'];
const emojis = ['🍎', '🏖️', '☁️', '💃', '🦅', '🔥', '🍇', '🏠', '🦷', '🍮'];
const otherPlayers = ['Alice', 'Bob', 'Charlie']; // Example other players

const Wordle = () => {
  const [playerName] = useState(localStorage.getItem('patientName') ?? 'Guest');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [word, setWord] = useState('');
  const [emoji, setEmoji] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [availableLetters, setAvailableLetters] = useState([]);
  const [triesLeft, setTriesLeft] = useState(3);
  const [leaderboard, setLeaderboard] = useState([]);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    setLeaderboard([
      { name: playerName, score: 0 },
      ...otherPlayers.map(name => ({ name, score: 0 }))
    ]);
    
    startNewWord();
  }, []);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
        if (Math.random() < 0.1) {
          const winner = otherPlayers[Math.floor(Math.random() * otherPlayers.length)];
          endRound(winner);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameOver]);

  const startNewWord = () => {
    if (currentWordIndex >= words.length) {
      endGame();
      return;
    }
    const newWord = words[currentWordIndex];
    const newEmoji = emojis[currentWordIndex];
    setWord(newWord);
    setEmoji(newEmoji);
    setGuessedLetters([]);
    setTriesLeft(3);
    setTimer(0);
    setGameOver(false);
    
    const uniqueLetters = new Set(newWord.split(''));
    while (uniqueLetters.size < 10) {
      const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      uniqueLetters.add(randomLetter);
    }
    setAvailableLetters(Array.from(uniqueLetters).sort(() => Math.random() - 0.5));
  };

  const handleGuess = (letter) => {
    if (gameOver) return;

    if (!guessedLetters.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
      if (word.includes(letter)) {
        updateScore(playerName, 5);
        if (word.split('').every(char => guessedLetters.includes(char) || char === letter)) {
          endRound(playerName);
        }
      } else {
        setTriesLeft(prevTries => prevTries - 1);
        if (triesLeft === 1) {
          endRound(null);
        }
      }
    }
  };

  const updateScore = (playerName, points) => {
    setLeaderboard(prevLeaderboard =>
      prevLeaderboard.map(player =>
        player.name === playerName ? { ...player, score: player.score + points } : player
      )
    );
  };

  const endRound = (winner) => {
    setGameOver(true);
    if (winner) {
      updateScore(winner, 20);
      alert(`${winner} guessed the word: ${word} ${emoji}`);
    } else {
      alert(`Out of tries! The word was: ${word} ${emoji}`);
    }
    setTimeout(() => {
      setCurrentWordIndex(prevIndex => prevIndex + 1);
      startNewWord();
    }, 2000);
  };

  const endGame = () => {
    const winner = leaderboard.reduce((prev, current) => (prev.score > current.score) ? prev : current);
    alert(`Game Over! Winner: ${winner.name} with ${winner.score} points`);
  };

  const displayWord = word.split('').map(letter => 
    guessedLetters.includes(letter) ? letter : '_'
  ).join(' ');

  return (
    <div>
      <button
      style={{
        position: 'absolute',
        top: '20px',
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
      <h2>Guess the Word (Word {currentWordIndex + 1} of 10)</h2>
      <p>Player: {playerName}</p>
      <p>{displayWord}</p>
      <p>Available letters: {availableLetters.join(' ')}</p>
      <p>Tries left: {triesLeft}</p>
      <p>Time: {timer} seconds</p>
      {availableLetters.map(letter => (
        <button key={letter} onClick={() => handleGuess(letter)} disabled={guessedLetters.includes(letter) || gameOver}>
          {letter}
        </button>
      ))}
      <h3>Leaderboard</h3>
      <ul>
        {leaderboard.sort((a, b) => b.score - a.score).map(player => (
          <li key={player.name}>{player.name}: {player.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default Wordle;
