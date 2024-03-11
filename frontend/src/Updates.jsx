import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import falloutboy from './assets/images/fallout.jpg';
import falloutboyUpdate from './assets/images/fallout-update.jfif';
import { Update } from "../wailsjs/go/main/App";

function Updates() {
  const [isRunning, setIsRunning] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [checkingForUpdates, setCheckingForUpdates] = useState(true);

  useEffect(() => {
    let intervalId;

    const checkForUpdatesWithDelay = async () => {
      try {
        // Call update function
        const result = await Update();
        console.log(result);

        // Set the updateAvailable based on the result
        setUpdateAvailable(result);
        setCheckingForUpdates(false);

        // Display the update status for 5 seconds
        setTimeout(() => {
          setUpdateAvailable(false);
          setCheckingForUpdates(true);
        }, 60000);
      } catch (error) {
        console.error(error);
      }
    };

    // Check for updates when the component mounts or isRunning state changes
    if (isRunning) {
      // Initial call with delay
      checkForUpdatesWithDelay();

      // Set up the interval
      intervalId = setInterval(() => {
        // Call update function with delay
        checkForUpdatesWithDelay();
      }, 6000);
    }

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
          <img src={falloutboyUpdate} alt="Update available" />
        </div>
      )}
      {!checkingForUpdates && !updateAvailable && (
        <div>
          <h3>You're Up To Date!!!</h3>
          <img src={falloutboy} alt="Up to date" />
        </div>
      )}
    </div>
  );
}

export default Updates;
