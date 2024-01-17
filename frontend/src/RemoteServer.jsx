// RemoteServer.jsx
import React, { useState, useEffect } from 'react';
import { Greet } from "../wailsjs/go/main/App";
import { Ping } from "../wailsjs/go/main/App";

function RemoteServer({ onResultChange }) {
  const [resultText, setResultText] = useState("Enter the remote server IP 👇");
  const [name, setName] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const updateName = (e) => setName(e.target.value);
  const updateResultText = (result) => {
    setResultText(result);
    // Pass the result to the parent component
    onResultChange(result);
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        // Call ping function
        Ping(name).then(updateResultText);
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
        />
        <button className="btn" onClick={startPingLoop}>Start</button>
        <button className="btn" onClick={stopPingLoop}>Stop</button>
      </div>
    </div>
  );
}

export default RemoteServer;
