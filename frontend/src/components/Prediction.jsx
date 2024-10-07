import React, { useState } from 'react';
import axios from 'axios';
import './Prediction.css';
import sendIcon from './img/send-icon.png';

function Prediction() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]); // State to hold chat messages
  const [error, setError] = useState(null);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async () => {
    if (!query) return; // Prevent empty messages

    setError(null); // Reset error state
    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, { text: query, sender: 'user' }]);
    
    try {
      const response = await axios.post('http://192.168.29.194:3000/api/symptoms', { query });
      console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data.symptoms)) {
        const symptoms = response.data.symptoms.join(', ');
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: `Symptoms extracted from your description are: ${symptoms}.`, sender: 'bot' }
        ]);
      } else {
        setError('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.error || 'Something went wrong. Please try again.');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Something went wrong. Please try again.', sender: 'bot' }
      ]);
    }

    setQuery(''); // Clear the input field after submitting
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      <div className="chat-history">
        {messages.map((message, index) => (
          <p key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
            {message.text}
          </p>
        ))}
      </div>
      <div className="textarea-container">
        <textarea
          className="textarea"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter symptoms here..."
        />
        <button onClick={handleSubmit}>
          <img src={sendIcon} alt="send" className="send-icon" />
        </button>
      </div>
    </div>
  );
}

export default Prediction;
