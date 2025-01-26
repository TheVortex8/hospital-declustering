import React from 'react';

const MoreInfo: React.FC = () => {
  return (
    <div className="container" style={{
      maxHeight: '100vh',
      overflowY: 'auto',
      padding: '20px',
      position: 'relative'
    }}>
      <button
        style={{
          position: 'sticky',
          top: '10px',
          left: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          color: '#ffffff',
          backgroundColor: '#00796b',
          border: 'none',
          cursor: 'pointer',
          zIndex: 1,
        }}
        onClick={() => window.location.href = '/dashboard'}
      >
        Back
      </button>
      <div className="info-bubble"></div>
      <h2>What is Triage?</h2>
      <p>Triage is a process that helps the medical team prioritize patients based on the urgency of their condition</p>

      <h3>Triage levels</h3>
      <ul>
        <li><strong>Level 1 - Resuscitation:</strong> Severely ill, immediate attention needed. For life-threatening conditions</li>
        <li><strong>Level 2 - Emergent:</strong> Requires rapid intervention. For serious but non-life-threatening conditions</li>
        <li><strong>Level 3 - Urgent:</strong> Requires urgent care</li>
        <li><strong>Level 4 - Less urgent:</strong> Requires less-urgent care</li>
        <li><strong>Level 5 - Non urgent:</strong> Requires non-urgent care. For mild conditions</li>
      </ul>

      <h3>Why Triage Helps</h3>
      <ul>
        <li><strong>Everyone gets the care they need:</strong> The system ensures those who need urgent care are seen first, but no one is forgotten.</li>
        <li><strong>Your wait time depends on the severity of your condition:</strong> We'll keep you informed along the way.</li>
      </ul>
    </div>
  );
};

export default MoreInfo;