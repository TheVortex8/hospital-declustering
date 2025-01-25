import React from 'react';
import '../styles/Login.css';
import logo from '../assets/logo.png'; // Adjust the path to your logo file

const Login: React.FC = () => {
    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Logo" className="logo" />
                <p className='moto'>Less anxiety, more clarity. <br />Your ER experience, reimagined</p>
                <form>
                    <div className="input-group">
                        <label htmlFor="firstName">Your First Name</label>
                        <input type="text" id="firstName" name="firstName" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <div className="dob-selectors">
                            <select id="day" name="day" required>
                                <option value="">Day</option>
                                {Array.from({ length: 31 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <select id="month" name="month" required>
                                <option value="">Month</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <select id="year" name="year" required>
                                <option value="">Year</option>
                                {Array.from({ length: 106 }, (_, i) => (
                                    <option key={i + 1920} value={i + 1920}>
                                        {i + 1920}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
