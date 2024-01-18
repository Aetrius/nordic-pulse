import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './Monitor.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


function Monitor({ pingResults, isRunning }) {

  // Convert pingResults object to an array
  const resultsArray = Object.values(pingResults || {});
  
  // Sort the array in reverse order based on timestamp (assuming timestamp is a property of the result objects)
  const sortedResults = resultsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Get the result with the newest timestamp
  const newestResult = sortedResults.length > 0 ? sortedResults[0] : null;

  // CSS class for flashing text effect
  const flashingTextClass = 'flashing-text';

  // Apply the flashing class once when the component renders
  useEffect(() => {
    const element = document.getElementById('HealthText'); // Reference the ID
    if (element) {
      element.classList.add(flashingTextClass);
      setTimeout(() => {
        element.classList.remove(flashingTextClass);
      }, 300); // Adjust the duration as needed
    }
  }, [newestResult]);
  
  return (
    <div id="Monitor">
      <Grid container spacing={2}>
        <Grid item xs={7}>
        <div id="PageBorder">
        <Grid container spacing={2}>
          <Grid item>
            <Typography  variant="h4" gutterBottom>
              Health
            </Typography>
          </Grid>
          <Grid item>
            {isRunning && <CircularProgress color="success" />}
          </Grid>
          
        </Grid>

        <Divider light />
        <div id="healthText">
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Last Timestamp:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={flashingTextClass} variant="body2" gutterBottom>
                {newestResult ? newestResult.timestamp : 'N/A'}
              </Typography>
            </Grid>

          </Grid>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Ping:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={flashingTextClass} variant="body2" gutterBottom>
                {newestResult ? newestResult.packetSuccess: 'N/A'} %
              </Typography>
            </Grid>

          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Packet Loss:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={flashingTextClass} variant="body2" gutterBottom>
                {newestResult ? newestResult.packetLoss : 'N/A'}
              </Typography>
            </Grid>
            
          </Grid>

          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="body2" gutterBottom>
                Round Trip Time:
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={flashingTextClass} variant="body2" gutterBottom>
                {newestResult ? newestResult.rtt : 'N/A'} ms
              </Typography>
            </Grid>

          </Grid>
        </div>
      </div>
        </Grid>
        <Grid item xs={5} >

          <div id="PingBorder">
            <Typography  variant="h5" gutterBottom>
              History
            </Typography>
            <List >
              {sortedResults.map((result, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton component="a">
                  <ListItemText
                      className={`historyList ${result.packetLoss > 0 || result.rtt > 154 ? 'red-text' : ''}`}
                      primary={result.timestamp + ' - Packets Lost: ' + result.packetLoss + ', Success: ' + result.packetSuccess + '%, RTT: ' + result.rtt + ' ms'}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>

        </Grid>
      </Grid>
    </div>
  );
}

export default Monitor;