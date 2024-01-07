// material-ui
import { useTheme } from '@mui/material/styles';
import {
  useMediaQuery,
  Grid,

  List,
  ListItem,

  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';

// third-party

// project import
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';

// assets


// ==============================|| RegionalCenter - VIEW ||============================== //

const RegionalCenterView = ({ data }: any) => {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <TableRow sx={{ '&:hover': { bgcolor: `transparent !important` }, overflow: 'hidden' }}>
      <TableCell colSpan={19} sx={{ p: 2.5, overflow: 'hidden' }}>
        <Transitions type="slide" direction="down" in={true}>
          <Grid container spacing={2.5} sx={{ pl: { xs: 0, sm: 1, md: 1, lg: 1, xl: 6 } }}>
            
            <Grid item xs={12} sm={7} md={8} lg={8} xl={9}>
              <Stack spacing={2.5}>
                <MainCard title="Regional Center Details">
                  <List sx={{ py: 0 }}>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Zonal Office ID</Typography>
                            <Typography>{data.id}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Zonal Office Code</Typography>
                            <Typography>
                              {data.age}
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <ListItem divider={!matchDownMD}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Description</Typography>
                            <Typography>{data.description}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Status</Typography>
                            <Typography>
                            {data.status}                           
                             </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>

                  </List>
                </MainCard>

              </Stack>
            </Grid>
          </Grid>
        </Transitions>
      </TableCell>
    </TableRow>
  );
};

export default RegionalCenterView;
