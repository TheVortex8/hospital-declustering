import React from 'react';

const MoreInfo: React.FC = () => {
  return (
    <div className="container" style={{
      maxHeight: '100vh',
      padding: '20px',
      position: 'relative',
      overflowY: 'scroll',
    }}>
      <button
      style={{
        position: 'absolute',
        top: '10px',
        left: '0px',
        padding: '10px 20px',
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#00796b',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={() => window.location.href = '/dashboard'}
    >
      Back
    </button>
      <div className="info-bubble">
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

      <h2>Why do tests?</h2>
      <p>Medical tests help doctors understand what's happening in your body.</p>

      <h3>Examples of tests</h3>
      <ul>
      <li><strong>Blood tests:</strong> Helps doctors understand your overall health and find out what might be causing your symptoms</li>
      <li><strong>X-Rays:</strong> Take pictures of bones and organs</li>
      <li><strong>CT Scan:</strong> Creates detailed images of your body</li>
      <li><strong>Ultrasound:</strong> Uses sound waves to create images of organs</li>
      <li><strong>EKG:</strong> Measures your heart's electrical activity</li>
      <li><strong>Urine tests:</strong> Analyze a sample of your urine</li>
      </ul>

      <h3>Why These Tests Matter</h3>
      <ul>
      <li>Tests help find the right diagnosis quickly so you can get the best care</li>
      <li>Results help doctors decide the next steps in your treatment</li>
      <li>Most tests don't take long and help doctors make sure you're getting the right care</li>
      </ul>
      </div>
      
    </div>
  );
};

export default MoreInfo;