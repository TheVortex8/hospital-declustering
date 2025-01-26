import { useState } from 'react';

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
        body: JSON.stringify({ input: `My name is ${username}: ${input}`}),
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
      style={{
        position: 'absolute',
        top: '10px',
        left: '20px',
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
      {/* Chat History Box */}
      <div className="history-box">
        <h2 className="history-title">QuickPulse AI</h2>
      </div>

      {/* Chat Messages */}
      <div 
        className="messages-container"
        style={{ 
          maxHeight: '400px', 
          overflowY: 'auto',
          padding: '10px'
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
            style={{ marginBottom: '10px' }}
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
          style={{ flex: 1, resize: 'vertical', width: '90%' }}
          rows={4}
        />
        <button 
          type="submit"
          className="send-button"
          disabled={isLoading}
          style={{ width: '90%' }}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbox;