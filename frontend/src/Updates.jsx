import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import falloutboyUpdate from './assets/images/fallout-update.jfif';
import { Update, ApplyUpdate } from "../wailsjs/go/main/App";

function Updates() {
  const [isRunning, setIsRunning] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [checkingForUpdates, setCheckingForUpdates] = useState(true);
  const [clientVersion, setClientVersion] = useState('');
  const [serverVersion, setServerVersion] = useState('');

  const handleClick = () => {
    ApplyUpdate();
  };

  useEffect(() => {
    let intervalId;
  
    const checkForUpdatesWithDelay = async () => {
      try {
        // Call update function
        const updateStats = await Update();
        console.log(updateStats.updateAvailable);

        // Access properties directly
        const isUpdateAvailable = updateStats.updateAvailable;
        const clientVersion = updateStats.localVersion;
        const serverVersion = updateStats.serverVersion;
        
        console.log(isUpdateAvailable);
  
        // Set the updateAvailable based on the result
        setUpdateAvailable(isUpdateAvailable);
        setCheckingForUpdates(false);
        setClientVersion(clientVersion);
        setServerVersion(serverVersion);
  
        // Display the update status for 1 minute
        setTimeout(() => {
          setUpdateAvailable(false);
          setCheckingForUpdates(true);
        }, 60000);
      } catch (error) {
        console.error(error);
      }
    };
  
    // Initial loading delay
    setTimeout(() => {
      // Check for updates when the component mounts or isRunning state changes
      if (isRunning) {
        // Initial call with delay
        checkForUpdatesWithDelay();
  
        // Set up the interval
        intervalId = setInterval(() => {
          // Call update function with delay
          checkForUpdatesWithDelay();
        }, 60000);
      }
    }, 300); // Add a 2-second loading delay
  
    // Cleanup the interval when the component is unmounted or isRunning is false
    return () => clearInterval(intervalId);
  
  }, [isRunning]);

  return (
    <div id="Updates">
      {checkingForUpdates && (
        <div>
          <h3>Checking for updates</h3>
          <CircularProgress />
        </div>
      )}
      {!checkingForUpdates && updateAvailable && (
        <div>
          <h3>Update is available</h3>
          <h3>Client Version: {clientVersion} {'=>'} Server Version: {serverVersion}</h3>
          <h3><img src={falloutboyUpdate} alt="Update available" /></h3>

          <Button onClick={handleClick}>Apply Update</Button>
        </div>
      )}
      {!checkingForUpdates && !updateAvailable && (
        <div>
          <h3>You're Up To Date!!!</h3>
          <h3>Client Version: {clientVersion} {'=='} Server Version: {serverVersion}</h3>
          <img src={falloutboyUpdate} alt="Up to date" />
        </div>
      )}
    </div>
  );
}

export default Updates;
