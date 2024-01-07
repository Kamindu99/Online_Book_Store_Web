import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import { Button, DialogActions, DialogContent, Divider, Grid, List, ListItem, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party

import { PatternFormat } from 'react-number-format';

// project imports

// assets

//types
import MainCard from 'components/MainCard';
import { customerData } from 'data/customers';
import { customerViewDataProps } from '../view/types/customer-view-types';

//sections

// constant

// ==============================|| View ||============================== //

const CustomerView = () => {
  const { actionType, userId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  //connect api here
  useEffect(() => {
    console.log(userId);
    console.log(actionType);
  }, [userId, actionType]);

  const customerDetails: customerViewDataProps = customerData[0]; // Access the first element of the array
  return (
    <>
      <DialogContent sx={{ p: 2.5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Stack spacing={2.5}>
              <MainCard title={'Customer Details'}>
                <List sx={{ py: 0, px: 1 }}>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Customer Name</Typography>
                          <Typography>
                            {customerDetails.firstName} {customerDetails.lastName}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Date of birth</Typography>
                          <Typography>{customerDetails.dob}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={11}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Status</Typography>
                        <Typography>{customerDetails.status}</Typography>
                      </Stack>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">NIC</Typography>
                          <Typography>{customerDetails.nic}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={11}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Address</Typography>
                        <Typography>{customerDetails.address}</Typography>
                      </Stack>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Email</Typography>
                          <Typography>{customerDetails.email}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Contact No</Typography>
                          <Typography align="left">
                            <PatternFormat
                              displayType="text"
                              format="+94 (###) ###-####"
                              mask="_"
                              defaultValue={customerDetails.contactNumber}
                            />
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem divider={!matchDownMD}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Agent</Typography>
                          <Typography>{customerDetails.agent}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">SubAgent</Typography>
                          <Typography>{customerDetails.subAgent}</Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                </List>
              </MainCard>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item></Grid>
          <Grid item>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                color="error"
                onClick={() => {
                  navigate(`/application/customer-management/customers`);
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </DialogActions>
    </>
  );
};

export default CustomerView;
