// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthChangePassword from 'sections/auth/auth-forms/AuthChangePassword';

// ================================|| CHANGE PASSWORD ||================================ //

const ChangePassword = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }} spacing={1}>
          <Typography variant="h3">Change Password</Typography>
          <Typography color="secondary">Please enter your existing password</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthChangePassword />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default ChangePassword;
