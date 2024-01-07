// material-ui
import { Grid } from '@mui/material';

// project import - card view components
import CardView from 'sections/dashboard/admin/home/card-view';


// ==============================|| VIEW DASHBOARD - ADMIN ||============================== //

const CreateEditView = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <CardView title="Total Books" count="95" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <CardView title="Total Transfers" count="2" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <CardView title="Total Dismiss" count="1" />
      </Grid>
    </Grid>
  );
};

export default CreateEditView;
