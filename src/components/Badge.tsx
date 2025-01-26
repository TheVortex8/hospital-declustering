import React from "react";
import "../styles/Badge.css";

interface BadgeProps {
    color: string;
    text: string;
}

export const Badge: React.FC<BadgeProps> = ({ color, text }) => {
    return (
        <span className="badge" style={{ borderColor: color }}>
            <span className="dot" style={{ backgroundColor: color }}></span>
            {text}
        </span>
    );
};