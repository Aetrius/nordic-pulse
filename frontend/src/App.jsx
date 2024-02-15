import React, { useState } from 'react';
import logo from './assets/images/viking-ship.png';
import './App.css';
import NavAppBar from './NavAppBar';
import RemoteServer from './RemoteServer';
import Monitor from './components/monitor/Monitor';
import HealthMonitor from './components/monitor/HealthMonitor';
// import TracerouteMonitor from './components/monitor/TracerouteMonitor';
import GraphMonitors from './components/monitor/GraphMonitors';

function App() {
  const [parentResults, setParentResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false); // New state for isRunning
  //const [tracerouteKey, setTracerouteKey] = useState(0);

  // const tracerouteData = ['Source', 'Router1', 'Router2', 'Destination'];

  const handleResultChange = (result, runningState) => {
    // Append the new result to the array of parentResults
    setParentResults(prevResults => {
      const newResults = [...prevResults, result];
      // Keep only the most recent 15 results
      return newResults.slice(-1000);
    });

    // Update the isRunning state
    setIsRunning(runningState);

    //setTracerouteKey((prevKey) => prevKey + 1);
  };

  return (
    <div id="App">
      <div id="navBar">
        <NavAppBar />
      </div>
      {/* <img src={logo} alt="logo"/> */}
      <RemoteServer onResultChange={handleResultChange} />
      {/* <TracerouteMonitor width={100} height={100}/> */}
      {/* <HealthMonitor pingResults={parentResults}/>  */}
      <GraphMonitors parentResults={parentResults}/>
      <Monitor pingResults={parentResults} isRunning={isRunning}/>
      
    </div>
  );
}

export default App;
