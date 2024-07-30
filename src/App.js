import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [url, setUrl] = useState('http://localhost:8080/appapplics'); // Default URL for your API
  const [requestBody, setRequestBody] = useState('');
  const [response, setResponse] = useState('');
  const [selectedApp, setSelectedApp] = useState('appA');
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSendRequest = async () => {
    try {
      let dummyResponse;

      switch (selectedApp) {
        case 'selectAll':
          dummyResponse = { message: "All apps selected." };
          break;
        case 'genericBeaureauService':
          dummyResponse = { message: "Generic Bureau Service response." };
          break;
        case 'scores':
          dummyResponse = { message: "Scores response." };
          break;
        case 'mappingService':
          dummyResponse = { message: "Mapping Service response." };
          break;
        case 'appA':
          dummyResponse = { message: "appA response." };
          break;
        case 'appACQ':
          dummyResponse = { message: "appACQ response." };
          break;
        case 'bureauCCC':
          dummyResponse = { message: "Bureau CCC response." };
          break;
        case 'bureauCBI':
          dummyResponse = { message: "Bureau CBI response." };
          break;
        case 'synappsCSI':
          dummyResponse = { message: "Synapps CSI response." };
          break;
        default:
          dummyResponse = { message: "Default response." };
          break;
      }

      setResponse(JSON.stringify(dummyResponse, null, 2));
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

  return (
    <div>
      <div className={`container ${showPopup ? 'blur' : ''}`}>
        <div className="header">API Testing Tool</div>
        <div className="controls">
          <div className="url-container">
            <input
              type="text"
              className="url-bar"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL"
            />
            <button className="send-button" onClick={handleSendRequest}>
              Send
            </button>
          </div>
          <div className="options">
            <button
              className={`option-button ${selectedApp === 'selectAll' ? 'active' : ''}`}
              onClick={() => setSelectedApp('selectAll')}
            >
              Select All
            </button>
            <button
              className={`option-button ${selectedApp === 'genericBeaureauService' ? 'active' : ''}`}
              onClick={() => setSelectedApp('genericBeaureauService')}
            >
              Generic Bureau Service
            </button>
            <button
              className={`option-button ${selectedApp === 'scores' ? 'active' : ''}`}
              onClick={() => setSelectedApp('scores')}
            >
              Scores
            </button>
            <button
              className={`option-button ${selectedApp === 'mappingService' ? 'active' : ''}`}
              onClick={() => setSelectedApp('mappingService')}
            >
              Mapping Service
            </button>
            <button
              className={`option-button ${selectedApp === 'appA' ? 'active' : ''}`}
              onClick={() => setSelectedApp('appA')}
            >
              appA
            </button>
            <button
              className={`option-button ${selectedApp === 'appACQ' ? 'active' : ''}`}
              onClick={() => setSelectedApp('appACQ')}
            >
              appACQ
            </button>
            <button
              className={`option-button ${selectedApp === 'bureauCCC' ? 'active' : ''}`}
              onClick={() => setSelectedApp('bureauCCC')}
            >
              Bureau CCC
            </button>
            <button
              className={`option-button ${selectedApp === 'bureauCBI' ? 'active' : ''}`}
              onClick={() => setSelectedApp('bureauCBI')}
            >
              Bureau CBI
            </button>
            <button
              className={`option-button ${selectedApp === 'synappsCSI' ? 'active' : ''}`}
              onClick={() => setSelectedApp('synappsCSI')}
            >
              Synapps CSI
            </button>
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
