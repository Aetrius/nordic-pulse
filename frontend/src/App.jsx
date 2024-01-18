import React, { useState } from 'react';
import logo from './assets/images/viking-ship.png';
import './App.css';
import NavAppBar from './NavAppBar';
import RemoteServer from './RemoteServer';
import Monitor from './components/monitor/Monitor';

function App() {
  const [parentResults, setParentResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false); // New state for isRunning

  const handleResultChange = (result) => {
    // Append the new result to the array of parentResults
    setParentResults(prevResults => {
      const newResults = [...prevResults, result];
      // Keep only the most recent 15 results
      return newResults.slice(-10);
    });

    // Update the isRunning state
    setIsRunning(runningState);

  };

  return (
    <div id="App">
      <div id="navBar">
        <NavAppBar />
      </div>
      {/* <img src={logo} alt="logo"/> */}
      <RemoteServer onResultChange={handleResultChange} />
      <Monitor pingResults={parentResults} isRunning={isRunning}/>
    </div>
  );
}

export default App;
