// material-ui
import { Grid, Typography } from '@mui/material';

// project import
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import MainCard from 'components/MainCard';

// assets

// ==============================|| LABELLED TASKS ||============================== //

function LabelledTasks() {
  return (
    <Grid item xs={12}>
      <MainCard sx={{ width: '100%' }}>
        <Grid container spacing={1.25}>
          <Grid item xs={6}>
            <Typography>Published Project</Typography>
          </Grid>
          <Grid item xs={6}>
            <LinearWithLabel value={30} color="primary" />
          </Grid>
          <Grid item xs={6}>
            <Typography>Completed Task</Typography>
          </Grid>
          <Grid item xs={6}>
            <LinearWithLabel value={90} color="success" />
          </Grid>
          <Grid item xs={6}>
            <Typography>Pending Task</Typography>
          </Grid>
          <Grid item xs={6}>
            <LinearWithLabel value={50} color="error" />
          </Grid>
          <Grid item xs={6}>
            <Typography>Issues</Typography>
          </Grid>
          <Grid item xs={6}>
            <LinearWithLabel value={55} color="warning" />
          </Grid> 
        </Grid>
      </MainCard>
    </Grid>
  );
}

export default LabelledTasks;
