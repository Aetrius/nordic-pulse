// GraphMonitors.jsx
import React, {useEffect} from 'react';
import { Grid } from '@mui/material';
import HealthMonitor from './HealthMonitor';
import TracerouteMonitor from './TracerouteMonitor';

function GraphMonitors({ parentResults }) {

  useEffect(() => {
    // Perform actions when pingResults prop changes
   // console.log('pingResults updated in GraphMonitors:', parentResults);
    // You can perform additional actions here if needed
  }, [parentResults]);

  return (
    <div id="GraphMonitor">
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <div id="PageBorder">
            <Grid container spacing={2}>
                <HealthMonitor pingResults={parentResults}/> 
            </Grid>
          </div>
        </Grid>
        <Grid item xs={5}>
          <div id="PingBorder">
            {/* You can pass other props to TracerouteMonitor if needed */}
            <TracerouteMonitor width={400} height={200} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default GraphMonitors;
