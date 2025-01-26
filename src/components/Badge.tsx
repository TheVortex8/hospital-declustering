import React from "react";
import "../styles/Badge.css";

interface BadgeProps {
    color: { border: string };
    label: string;
}

export const Badge: React.FC<BadgeProps> = ({ color: style, label }) => {
    return (
        <span className="badge" style={{ borderColor: style.border }}>
            <span className="dot" style={{ backgroundColor: style.border }}></span>
            {label}
        </span>
    );
};