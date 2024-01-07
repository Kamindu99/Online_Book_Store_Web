import { ReactNode } from 'react';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

// project import
import Logo from 'components/logo';
import CustomerCard from './CustomerCard';

// assets
import { PhoneOutlined } from '@ant-design/icons';
import CustomerBackground from 'assets/images/customer/CustomerBackground';
import CustomerFooter from 'components/cards/CustomerFooter';

interface Props {
  children: ReactNode;
}

// ==============================|| CUSTOMER - WRAPPER ||============================== //

const CustomerWrapper = ({ children }: Props) => (
  <Box sx={{ minHeight: '100vh' }}>
    <CustomerBackground />
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12} sx={{ ml: 3, mt: 3 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}><Logo /> </Grid>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'right', paddingRight: "12px" }}>
            <Typography sx={{ color: "#2A4182", fontWeight: "bold", fontSize: "16px" }}> <PhoneOutlined style={{ color: "#FFC107", fontSize: '20px' }} /> Call Now !</Typography>
            <Typography sx={{ color: "#FFC107", fontSize: "16px" }}><a href="tel:+94114883883">+94 11 4 883 883</a></Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: {
              xs: 'calc(100vh - 210px)',
              sm: 'calc(100vh - 134px)',
              md: 'calc(100vh - 112px)'
            }
          }}
        >
          <Grid item sx={{ width: "100%" }}>
            <CustomerCard>{children}</CustomerCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <CustomerFooter />
      </Grid>
    </Grid>
  </Box>
);

export default CustomerWrapper;
