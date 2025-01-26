import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('patientName');
    setUserName(storedUserName || 'Guest');
  }, []);

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
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        Hello, {userName}!
      </h2>
      <div style={gridStyle}>
        <button 
          style={buttonStyle}
          onClick={() => navigate('/games')}
        >
          Games
        </button>
      </div>
    </div>
  );
};

export default Dashboard;