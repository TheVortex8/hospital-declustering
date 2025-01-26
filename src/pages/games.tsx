import { useNavigate } from 'react-router-dom';
import React from 'react';
import { FaHammer, FaPuzzlePiece } from 'react-icons/fa'; // Import icons

const Games: React.FC = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: '20px', // Add padding inside the button
    width: '100%',
    height: '100%',
    minHeight: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'row' as const, // Change to row direction
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start
    backgroundColor: '#f9f9f9',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '20px', // Add padding between buttons
    width: '95%',
    maxWidth: '600px',
    height: '400px',
    margin: '20px auto', // Add padding around the grid
    placeItems: 'center',
  };

  const iconStyle = {
    marginRight: '10px', // Add space between icon and text
    fontSize: '24px',
    color: '#78B3CE',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        Hello, {localStorage.getItem('patientName')}!
      </h2>
      <button
        style={{
          position: 'absolute',
          top: '10px',
          left: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#00796b',
          border: 'none',
          cursor: 'pointer',
        }}
        onClick={() => window.location.href = '/dashboard'}
      >
        Back
      </button>
      <div style={gridStyle}>
        <button 
          style={buttonStyle}
          onClick={() => navigate('/whackeamole')}
        >
          <FaHammer style={iconStyle} /> {/* Add icon */}
          <div>
            <h3>Whack-a-mole</h3>
            <p style={{color: '#78B3CE'}}>Hit the moles quickly.</p>
          </div>
        </button>
        <button 
          style={buttonStyle}
          onClick={() => navigate('/wordle')}
        >
          <FaPuzzlePiece style={iconStyle} /> {/* Add icon */}
          <div>
            <h3>Wordle</h3>
            <p style={{color: '#78B3CE'}}>Guess the word correctly.</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Games;