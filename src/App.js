import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

// Constants
const MODES = [
  { value: 'genericBeaureauService', label: 'Generic Bureau' },
  { value: 'scores', label: 'Scores' },
  { value: 'mappingService', label: 'Mapping' },
  { value: 'appA', label: 'appA' },
  { value: 'appACQ', label: 'appACQ' },
  { value: 'bureauCCC', label: 'Bureau CCC' },
  { value: 'bureauCBI', label: 'Bureau CBI' },
  { value: 'synappsCSI', label: 'Synapps' },
];

const ENVIRONMENTS = {
  qa: 'https://qa.example.com',
  dev: 'https://dev.example.com',
};

function App() {
  const [baseURL, setBaseURL] = useState('http://localhost:8080/');
  const [endpoint, setEndpoint] = useState('getchoreoxresponse');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [selectedModes, setSelectedModes] = useState([]);
  const [selectedEnv, setSelectedEnv] = useState('qa');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSendRequest = async () => {
    try {
      const url = `${baseURL}${endpoint}`;
      const modesHeader = selectedModes.join(',');
      const headers = {
        'Content-Type': 'application/json',
        'mode': modesHeader,
        'url': ENVIRONMENTS[selectedEnv],
      };

      console.log('Request Headers:', headers);

      const { data } = await axios.post(url, requestBody, { headers });
      setResponse(JSON.stringify(data, null, 2));
      setPopupMessage('Request was successful');
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse('Error fetching data');
      setPopupMessage('Request failed');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  const handleModeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedModes((prev) =>
      checked ? [...prev, value] : prev.filter((mode) => mode !== value)
    );
  };

  const handleEnvChange = (e) => {
    setSelectedEnv(e.target.value);
  };

  const handleURLChange = (e) => {
    const url = e.target.value;
    const [newBaseURL, newEndpoint] = url.split(/\/(?=[^/]+$)/);
    setBaseURL(newBaseURL);
    setEndpoint(newEndpoint || '');
  };

  return (
    <div>
      <div className={`container ${showPopup ? 'blur' : ''}`}>
        <div className="header">API Testing Tool</div>
        <div className="controls">
          <div className="url-container">
            <input
              type="text"
              className="url-bar"
              value={`${baseURL}${endpoint}`}
              onChange={handleURLChange}
              placeholder="Enter URL"
            />
            <button className="send-button" onClick={handleSendRequest}>
              Send
            </button>
          </div>
          <div className="mode-header">
            {MODES.map((mode) => (
              <label key={mode.value} className="option-button">
                <input
                  type="checkbox"
                  value={mode.value}
                  checked={selectedModes.includes(mode.value)}
                  onChange={handleModeChange}
                  style={{ marginRight: '10px' }}
                />
                {mode.label}
              </label>
            ))}
          </div>
          
          <div className="url-header">
            <label className="option-button">
              <input
                type="radio"
                value="qa"
                checked={selectedEnv === 'qa'}
                onChange={handleEnvChange}
                style={{ marginRight: '10px' }}
              />
              QA
            </label>
            <label className="option-button">
              <input
                type="radio"
                value="dev"
                checked={selectedEnv === 'dev'}
                onChange={handleEnvChange}
                style={{ marginRight: '10px' }}
              />
              DEV
            </label>
          </div>
        </div>
        <div className="content">
          <textarea
            className="request-body"
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
            placeholder="Enter request body"
          />
          <textarea
            className="response-box"
            value={response}
            readOnly
            placeholder="Response will appear here"
          />
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <p>{popupMessage}</p>
              <button onClick={closePopup} className="close-button">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
