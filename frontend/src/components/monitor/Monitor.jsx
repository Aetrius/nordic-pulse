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


function Monitor({ pingResults }) {

  const defaultResults = ["Default Ping Result"];
  
  return (
    <div id="Monitor">
      <Grid container spacing={2}>
        <Grid item xs={8}>
        <div id="PageBorder">
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              Health
            </Typography>
          </Grid>
          <Grid item>
            <CircularProgress color="success" />
          </Grid>
          
        </Grid>

        <Divider light />

        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              Ping:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              N/A
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
            <Typography variant="body2" gutterBottom>
              N/A
            </Typography>
          </Grid>
          
        </Grid>

        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              TTL:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" gutterBottom>
              N/A
            </Typography>
          </Grid>
          
        </Grid>
      </div>
        </Grid>
        <Grid item xs={4}>

          <div id="PingBorder">
            <List>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText primary={pingResults} />
                </ListItemButton>
              </ListItem>
            </List>
          </div>

        </Grid>
      </Grid>
    </div>
  );
}

export default Monitor;