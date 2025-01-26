import React from 'react';
import '../styles/FeedbackTile.css'

const FeedbackTile: React.FC = () => {
    return (
        <div className="feedback-badge">
            <button onClick={() => window.location.href = '/feedback'}>Feedback</button>
        </div>
    );
};

export default FeedbackTile;