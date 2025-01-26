import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaUser, FaGamepad, FaComments, FaBook } from 'react-icons/fa'; // Import icons

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('patientName');
    setUserName(storedUserName || 'Guest');
  }, []);

  const buttonStyle = {
    padding: '20px', // Add padding inside the button
    width: '100%',
    height: '100%',
    minHeight: '10px',
    fontSize: '16spx',
    cursor: 'pointer',
    border: '1px solid #ccc',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '20px', // Add padding between buttons
    width: '95%',
    maxWidth: '600px',
    height: '400px',
    margin: '20px auto', // Add padding around the grid
    placeItems: 'center',
  };

  const iconStyle = {
    textAlign: 'left' as const,
    height:'100%',
    width:'100%',
    borderRadius: '50%',
    fontSize: '24px',
    marginBottom: '10px', // Add space between icon and text
    color: '#78B3CE',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px', // Add space between icon and text
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
        Hello, {userName}!
      </h2>
      <div style={gridStyle}>
        <button 
          style={buttonStyle}
          onClick={() => navigate('/profile')}
        >
          <span style={iconStyle}>
          <FaUser size={24} color='#78B3CE' style={{backgroundColor:'#555', padding: '1rem', borderRadius: '50%'}}/> {/* Add icon */}
          Profile
          </span>
        </button>
        <button 
          style={buttonStyle}
          onClick={() => navigate('/knowledgeCenter')}
        >
          <span style={iconStyle}>
          <FaBook size={24} color='#78B3CE' style={{backgroundColor:'#555', padding: '1rem', borderRadius: '50%'}}/> {/* Add icon */}
          <span style={{ whiteSpace: 'nowrap', fontSize: '18px' }}>Knowledge Center</span>
          </span>
        </button>

        <button 
          style={buttonStyle}
          onClick={() => navigate('/games')}
        >
          <span style={iconStyle}>
          <FaGamepad size={24} style={{backgroundColor:'#555', padding: '1rem', borderRadius: '50%'}}/> {/* Add icon */}
          Games
          </span>
        </button>
        <button 
          style={buttonStyle}
          onClick={() => navigate('/chatbox')}
        >
          <span style={iconStyle}>
          <FaComments size={24} style={{backgroundColor:'#555', padding: '1rem', borderRadius: '50%'}} /> {/* Add icon */}
          Ask Us
          </span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;