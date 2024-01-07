// material-ui
import { Grid, Stack } from '@mui/material';

// project import
import CustomerWrapper from 'sections/customer/CustomerWrapper';
import CustomerViewForm from 'sections/customer/CustomerView';

// ================================|| ApplicantDetails ||================================
const CustomerView = () => {
  return (
    <>
      <CustomerWrapper>
        <Grid container spacing={1} sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
          <h3>Customer view</h3>
          <Stack spacing={2.5} paddingLeft={1}>
            <CustomerViewForm />
          </Stack>
        </Grid>
      </CustomerWrapper>
    </>
  );
};

export default CustomerView;
