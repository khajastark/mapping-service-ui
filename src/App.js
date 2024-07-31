import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [baseURL, setBaseURL] = useState('http://localhost:8080/');
  const [endpoint, setEndpoint] = useState('all');
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [selectedApp, setSelectedApp] = useState('selectAll');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSendRequest = async () => {
    try {
      const url = `${baseURL}${endpoint}`;
      const { data } = await axios.post(url, requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });

      setResponse(JSON.stringify(data, null, 2));
      setPopupMessage(`Request for ${selectedApp} was successful`);
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

  const handleAppChange = (e) => {
    const selected = e.target.value;
    setSelectedApp(selected);

    let newEndpoint;
    switch (selected) {
      case 'appA':
        newEndpoint = 'appa';
        break;
      case 'appACQ':
        newEndpoint = 'appacq';
        break;
      case 'bureauCCC':
        newEndpoint = 'bureauccc';
        break;
      case 'bureauCBI':
        newEndpoint = 'bureaucbi';
        break;
      case 'genericBeaureauService':
        newEndpoint = 'genericbeureau';
        break;
      case 'scores':
        newEndpoint = 'scores';
        break;
      case 'mappingService':
        newEndpoint = 'mapping';
        break;
      case 'synappsCSI':
        newEndpoint = 'synapps';
        break;
      default:
        newEndpoint = 'appapplics';
        break;
    }

    setEndpoint(newEndpoint);
    setRequestBody(''); // Clear the request body
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
          <div className="mode-container">
            <select className="mode-dropdown" value={selectedApp} onChange={handleAppChange}>
              <option value="selectAll">Select All</option>
              <option value="genericBeaureauService">Generic Bureau Service</option>
              <option value="scores">Scores</option>
              <option value="mappingService">Mapping Service</option>
              <option value="appA">appA</option>
              <option value="appACQ">appACQ</option>
              <option value="bureauCCC">Bureau CCC</option>
              <option value="bureauCBI">Bureau CBI</option>
              <option value="synappsCSI">Synapps CSI</option>
            </select>
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
