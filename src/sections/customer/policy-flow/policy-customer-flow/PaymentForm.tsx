// material-ui
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import { useState } from 'react';

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //
const validationSchema = yup.object({
  // vehicleRegistrationFile: yup.mixed().required('Copy of a Vehicle Registration File is a required.'),
  termsCheck: yup.boolean().oneOf([true], 'You must agree to the declarations')
});

export type PaymentData = {
  referenceNumber?: number;
  vehicleNumber?: string;
  paymentAmount?: number;
  termsCheck?: boolean;
};

interface PaymentFormProps {
  paymentData: PaymentData;
  setPaymentData: (d: PaymentData) => void;
  handleNext: () => void;
  handleBack: () => void;
  setErrorIndex: (i: number | null) => void;
}

const PaymentForm = ({ paymentData, setPaymentData, handleNext, handleBack, setErrorIndex }: PaymentFormProps) => {
  const formik = useFormik({
    initialValues: {
      referenceNumber: 124812490,
      vehicleNumber: 'CAB 8898',
      paymentAmount: 900.0,
      termsCheck: false
    },
    validationSchema,
    onSubmit: (values) => {
      setPaymentData({
        referenceNumber: values.referenceNumber,
        vehicleNumber: values.vehicleNumber,
        paymentAmount: values.paymentAmount,
        termsCheck: values.termsCheck
      });
      handleNext();
    }
  });

  //declaration dialog box
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={0.5}>
              <InputLabel disabled={true}>Reference Number</InputLabel>
              <TextField
                id="referenceNumber"
                name="referenceNumber"
                placeholder="Reference Number *"
                value={formik.values.referenceNumber}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="given-name"
                disabled={true}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={0.5}>
              <InputLabel disabled={true}>Vehicle Number</InputLabel>
              <TextField
                id="vehicleNumber"
                name="vehicleNumber"
                placeholder="Vehicle Number *"
                value={formik.values.vehicleNumber}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="given-name"
                disabled={true}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={0.5}>
              <InputLabel disabled={true}>Payment Amount (LKR)</InputLabel>
              <TextField
                id="paymentAmount"
                name="paymentAmount"
                placeholder="Payment Amount *"
                value={formik.values.paymentAmount}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="given-name"
                disabled={true}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" sx={{ ml: -1 }}>
              <Checkbox name="termsCheck" onChange={formik.handleChange} sx={{ '& .css-1vjb4cj': { borderRadius: '2px' } }} />
              <Typography variant="body2">
                I have read and agreed to the &nbsp;
                <Link variant="subtitle2" component={RouterLink} to="#" onClick={handleClickOpen}>
                  declarations
                </Link>
              </Typography>

              <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <Box sx={{ p: 1, py: 1.5 }}>
                  <DialogTitle id="alert-dialog-title">Terms and Conditions</DialogTitle>
                  <Divider />

                  <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ textAlign: 'justify' }}>
                      <ul style={{ listStyleType: 'disc', textAlign: 'justify' }}>
                        <li style={{ marginBottom: "15px" }}>I/We declare that the information stated, and documents submitted herein are true and correct. I/We agree that, if any
                          such declarations/submissions made by me/us are found to be incorrect or incomplete, not legally acceptable, HNB
                          General Insurance Ltd shall have absolute discretion to return/not process the application and further HNB General
                          Insurance Ltd shall have full discretion to reject/reduce the refund amount from the payment received from me/us in
                          case of such events.</li>
                      </ul>
                    </DialogContentText>
                  </DialogContent>
                  <Divider />

                  <DialogActions>
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ width: 1, px: 1.5, py: 0.75 }}>
                      <Button variant="contained" onClick={handleClose}>
                        Accept
                      </Button>
                    </Stack>
                  </DialogActions>
                </Box>
              </Dialog>
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ ml: -1 }}>
              {formik.errors.termsCheck && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {' '}
                  {formik.errors.termsCheck}{' '}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button variant="outlined" onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <AnimateButton>
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(2)}>
                  Pay
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PaymentForm;
