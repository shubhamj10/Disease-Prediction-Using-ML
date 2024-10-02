import React, { useState } from 'react';
import axios from 'axios';
import './Prediction.css';
import sendIcon from './img/send-icon.png';

function Prediction() {
  const [query, setQuery] = useState('');
  const [outputMessage, setOutputMessage] = useState('');
  const [error, setError] = useState(null);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async () => {
    setError(null); // Reset error state
    try {
      const response = await axios.post('http://192.168.29.194:3000/api/symptoms', { query });
      console.log('API Response:', response.data);

      if (response.data && Array.isArray(response.data.symptoms)) {
        const symptoms = response.data.symptoms.join(', '); // Join symptoms into a single string
        setOutputMessage(`Symptoms extracted from your description are: ${symptoms}.`);
      } else {
        setError('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container">
      {error && <p className="error">{error}</p>}
      {outputMessage && <p className="output-message">{outputMessage}</p>} {/* Display output message */}
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
