import React, { useState, FormEvent } from 'react';
import '../styles/Login.css';
import logo from '../assets/logo.png';

const Login: React.FC = () => {
    const [name, setName] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    if(localStorage.getItem('user')) {
        window.location.href = '/dashboard';
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    birthDate: `${year}${month.padStart(2, '0')}${day.padStart(2, '0')}`
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            // Handle successful login here
            console.log('Login successful:', data);
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('patientName', data.name);
            window.location.href = '/dashboard';
            
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={logo} alt="Logo" className="logo" />
                <p className='moto'>Less anxiety, more clarity. <br />Your ER experience, reimagined</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Your Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input 
                                type="number" 
                                id="year" 
                                name="year" 
                                placeholder="Year"
                                min="1920"
                                max="2025"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                required
                                style={{ width: '100px' }}
                            />
                            <input 
                                type="number" 
                                id="month" 
                                name="month" 
                                placeholder="Month"
                                min="1"
                                max="12"
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                required
                                style={{ width: '100px' }}
                            />
                            <input 
                                type="number" 
                                id="day" 
                                name="day" 
                                placeholder="Day"
                                min="1"
                                max="31"
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                required
                                style={{ width: '100px' }}
                            />
                        </div>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
