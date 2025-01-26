import { useNavigate } from 'react-router-dom';
import React from 'react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: '10px',
    margin: '10px',
    width: '100%',
    minHeight: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(2, 1fr)',
    gap: '15px',
    padding: '15px',
    width: '95%',
    maxWidth: '600px',
    margin: '0 auto',
  };

  return (
    <div style={gridStyle}>
      <button 
        style={buttonStyle}
        onClick={() => navigate('/games')}
      >
        Games
      </button>
    </div>
  );
};

export default Dashboard;