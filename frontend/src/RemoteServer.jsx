import React, { useState, useEffect } from 'react';
import { Ping } from "../wailsjs/go/main/App";

function RemoteServer({ onResultChange }) {
  const [resultText, setResultText] = useState();
  const [name, setName] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  
  const updateResultText = (result) => {
    setResultText(result);
    // Pass the result to the parent component
    onResultChange(result, isRunning);
  };

  const updateName = (e) => {
    const newName = e.target.value;
    setName(newName);
    // Save the entered IP address to the cookie
    setCookie('lastEnteredIP', newName, 365);
  };

  // Function to set a cookie
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // Function to get a cookie by name
  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  };
  
  // Load the last entered IP address from the cookie
  useEffect(() => {
    const savedName = getCookie('lastEnteredIP');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        // Call ping function
        Ping(name).then((result) => {
          updateResultText(result);
          //console.log(result); // Now result is defined
        });
      }, 1000); // Adjust the interval as needed
    }

    return () => {
      // Cleanup on component unmount
      clearInterval(intervalId);
    };
  }, [isRunning, name, onResultChange]);

  const startPingLoop = () => {
    setIsRunning(true);
  };

  const stopPingLoop = () => {
    setIsRunning(false);
  };

  return (
    <div id="RemoteServer">
      {/* <div id="result" className="result">{resultText}</div> */}
      <div id="input" className="input-box">
        <input
          id="name"
          placeholder="192.168.1.2"
          className="input"
          onChange={updateName}
          autoComplete="off"
          name="input"
          type="text"
          value={name}
        />
        <button className={`btn ${isRunning ? 'running' : ''}`}
          onClick={startPingLoop}
          disabled={isRunning}>Start</button>
        <button className={`btn ${!isRunning ? 'disabled' : ''}`}
          onClick={stopPingLoop}
          disabled={!isRunning}>Stop</button>
      </div>
    </div>
  );
}

export default RemoteServer;
