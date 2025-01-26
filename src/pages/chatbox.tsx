import { useState } from 'react';
import '../styles/chatbox.css'; // Import the CSS file

const Chatbox = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const username = localStorage.getItem('patientName');

  if (!username) {
    window.location.href = '/login';
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatgpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, input: `My name is ${username}: ${input}`}),
      });

      const data = await response.json();
      
      // Add AI response
      setMessages(prev => [...prev, { text: data.message, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { text: 'Error: Could not get response', isUser: false }]);
    }

    setIsLoading(false);
    setInput('');
  };

  return (
    <div className="chat-container">
      <button
        className="back-button"
        onClick={() => window.location.href = '/dashboard'}
      >
        Back
      </button>
      {/* Chat History Box */}
      <div className="history-box">
        <h2 className="history-title">QuickPulse AI</h2>
      </div>

      {/* Chat Messages */}
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && <div className="loading">Loading...</div>}
      </div>
      
      <form onSubmit={handleSubmit} className="message-form">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="message-input"
          placeholder="What is my position in queue?"
          rows={4}
        />
        <button 
          type="submit"
          className="send-button"
          disabled={isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbox;