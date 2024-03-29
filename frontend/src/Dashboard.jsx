import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import RemoteServer from './RemoteServer';
import Monitor from './components/monitor/Monitor';
import HealthMonitor from './components/monitor/HealthMonitor';
// import TracerouteMonitor from './components/monitor/TracerouteMonitor';
import GraphMonitors from './components/monitor/GraphMonitors';
import './App.css';


function Dashboard() {

  const [parentResults, setParentResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false); // New state for isRunning
  //const [tracerouteKey, setTracerouteKey] = useState(0);

  const clearData = () => {
    // Clear the data slice
    setParentResults([]);
  };

  const handleResultChange = (result, runningState) => {
    // Append the new result to the array of parentResults
    setParentResults(prevResults => {
      const newResults = [...prevResults, result];
      // Keep only the most recent 15 results
      return newResults.slice(-10000);
    });

    // Update the isRunning state
    setIsRunning(runningState);

    //setTracerouteKey((prevKey) => prevKey + 1);
  };

  return (
    <div id="Dashboard">

      <RemoteServer onResultChange={handleResultChange} clearData={clearData}/>
      {/* <TracerouteMonitor width={100} height={100}/> */}
      {/* <HealthMonitor pingResults={parentResults}/>  */}
      <GraphMonitors parentResults={parentResults}/>
      <Monitor pingResults={parentResults} isRunning={isRunning}/>
        
    </div>
  )
}

export default Dashboard;
