import Grid from '@mui/material/Grid';

function Dashboard() {
  return (
    <div id="Dashboard">
    <Grid container spacing={2}>
      <Grid xs={8}>
        <Item>xs=8</Item>
      </Grid>
      <Grid xs={4}>
        <Item>xs=4</Item>
      </Grid>
      <Grid xs={4}>
        <Item>xs=4</Item>
      </Grid>
      <Grid xs={8}>
        <Item>xs=8</Item>
      </Grid>
    </Grid>
        
    </div>
  )
}

export default Dashboard;
