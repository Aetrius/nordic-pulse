import React, {useState} from 'react';
import {Greet} from "../wailsjs/go/main/App";
import {Ping} from "../wailsjs/go/main/App";
import {Pong} from "../wailsjs/go/main/App";

function RemoteServer() {

  const [resultText, setResultText] = useState("Enter the remote server IP 👇");
  const [name, setName] = useState('');
  const updateName = (e) => setName(e.target.value);
  const updateResultText = (result) => setResultText(result);

  function greet() {
    Greet(name).then(updateResultText);
  }

  function ping() {
    Ping().then(updateResultText);
  }

  return (
    <div id="RemoteServer">
      <div id="result" className="result">{resultText}</div>
      <div id="input" className="input-box">
        <input id="name" placeholder="192.168.1.2" className="input" onChange={updateName} autoComplete="off" name="input" type="text"/>
        <button className="btn" onClick={ping}>Start</button>
      </div>
    </div>
  )
}

export default RemoteServer;
