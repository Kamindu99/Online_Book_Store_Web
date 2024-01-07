// material-ui
import { Grid } from '@mui/material';

// project import - common components
import CardView from 'sections/dashboard/agent/home/card-view';


// ==============================|| VIEW DASHBOARD - AGENT ||============================== //

const CreateEditView = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <CardView title="Agent ID" count="AGENT-1234"/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <CardView title="Total Customers" count="78,250"/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <CardView  title="Commission Amount" count="LKR 18,250"/>
      </Grid>
    </Grid>
  );
};

export default CreateEditView;
