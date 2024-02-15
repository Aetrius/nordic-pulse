// GraphMonitors.jsx
import React, {useEffect} from 'react';
import { Grid } from '@mui/material';
import HealthMonitor from './HealthMonitor';
// import TracerouteMonitor from './TracerouteMonitor';

function GraphMonitors({ parentResults }) {

  useEffect(() => {
    // Perform actions when pingResults prop changes
   // console.log('pingResults updated in GraphMonitors:', parentResults);
    // You can perform additional actions here if needed
  }, [parentResults]);

  return (
    <div id="GraphMonitor">
          <div id="PageBorder">
            {/* <Grid container spacing={2}> */}
                <HealthMonitor pingResults={parentResults}/> 
            {/* </Grid> */}
          </div>
    </div>
  );
}

export default GraphMonitors;
