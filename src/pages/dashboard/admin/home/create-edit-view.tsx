// material-ui
import { Grid } from '@mui/material';

// project import - card view components
import CardView from 'sections/dashboard/admin/home/card-view';


// ==============================|| VIEW DASHBOARD - ADMIN ||============================== //

const CreateEditView = () => {

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <CardView title="Total Incomplete Applications" count="2,223"/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <CardView title="Total Customers" count="78,250"/>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <CardView  title="Total Completed Applications" count="18,250"/>
      </Grid>
    </Grid>
  );
};

export default CreateEditView;
