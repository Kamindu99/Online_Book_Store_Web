// material-ui
import { Button, Grid, InputLabel, Stack, TextField } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// third-party
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

//data import
import { customerViewData } from 'data/customerview';

// ==============================|| Form  ||============================== //
export interface CustomerViewFormProps {
  referenceno?: String;
  policyno?: String;
  date?: Date;
  time?: String;
}

const CustomerView = ({ referenceno, policyno, date, time }: CustomerViewFormProps) => {
  const navigate = useNavigate();

  return (
    <MainCard>
      <Formik
        initialValues={{
          referenceno: customerViewData[0].referenceno || '',
          policyno: customerViewData[0].policyno || '',
          date: customerViewData[0].date || new Date(),
          time: customerViewData[0].time || ''
        }}
        onSubmit={() => {}}
      >
        {() => (
          <Grid container spacing={3}>
            <Grid item xs={12} sx={{ paddingBottom: 2 }} spacing={2}>
              <Stack spacing={1}>
                <InputLabel htmlFor="refno">Reference Number</InputLabel>
                <TextField fullWidth id="referenceNo" name="referenceNo" value={customerViewData[0].referenceno} disabled />
                <InputLabel htmlFor="refno">Policy Number</InputLabel>
                <TextField fullWidth id="policyNo" name="PolicyNo" value={customerViewData[0].policyno} disabled />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <InputLabel htmlFor="date">Date</InputLabel>
                  <DatePicker disabled defaultValue={customerViewData[0].date} />
                </LocalizationProvider>
                <InputLabel htmlFor="refno">Time</InputLabel>
                <TextField id="time" placeholder="Alarm Clock" type="time" defaultValue={customerViewData[0].time} disabled />
              </Stack>
            </Grid>
            <Grid item xs={12} container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Stack direction="column" sx={{ width: '100%' }} paddingLeft={1} spacing={2}>
                <AnimateButton>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      navigate('/customer/feature');
                    }}
                  >
                    View Certificate
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      navigate('/customer/feature');
                    }}
                  >
                    Payment Receipt
                  </Button>
                </AnimateButton>

                <AnimateButton>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      navigate('/customer/feature');
                    }}
                  >
                    Branch Netwrok
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Formik>
    </MainCard>
  );
};

export default CustomerView;
