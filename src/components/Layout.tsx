// filepath: /home/moh/projects/hospital-declustering/src/components/Layout.tsx
import React from 'react';
import FeedbackTile from './FeedbackTile';
import './Layout.css';

const Layout: React.FC = ({ children }) => {
    return (
        <div className="layout">
            <FeedbackTile />
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Layout;