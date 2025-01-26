import React, { useState, useEffect } from 'react';

const WhackAMole = () => {
  const [moles, setMoles] = useState(Array(9).fill(false));
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft > 0) {
      const moleTimer = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * moles.length);
        setActiveIndex(randomIndex);
        setMoles((prev) =>
          prev.map((_, idx) => (idx === randomIndex ? true : false))
        );
      }, 800);
      return () => clearInterval(moleTimer);
    } else {
      alert(`Game Over! Your score is ${score}`);
      setMoles((prev) => prev.map(() => false));
    }
  }, [timeLeft, moles.length]);

  const handleMoleClick = (index) => {
    if (index === activeIndex) {
      setScore((prev) => prev + 1);
      
      if (score >= highScore) {
        setHighScore((prev) => prev + 1);
      }

      setActiveIndex(null);
      setMoles((prev) => prev.map(() => false));
    }
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setMoles(Array(9).fill(false));
    setActiveIndex(null);
  };

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', backgroundColor: '#e0f7fa' }}>
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
      <div style={{ width: '100%', height: '100%', textAlign: 'center', backgroundColor: '#ffffff' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Whack-a-Mole</h1>
        <p style={{ fontSize: '18px' }}>High score: {highScore}</p>
        <p style={{ fontSize: '18px' }}>Score: {score}</p>
        <p style={{ fontSize: '18px' }}>Time Left: {timeLeft}s</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', margin: '16px auto', maxWidth: '300px' }}>
          {moles.map((isActive, index) => (
            <button
              key={index}
              style={{
                height: '80px',
                width: '80px',
                backgroundColor: isActive ? '#4caf50' : '#cfd8dc',
                transition: 'background-color 0.3s',
                border: 'none',
              }}
              onClick={() => handleMoleClick(index)}
              disabled={!isActive}
            ></button>
          ))}
        </div>
        {timeLeft === 0 && (
          <button
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              color: '#ffffff',
              backgroundColor: '#00796b',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={resetGame}
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default WhackAMole;
