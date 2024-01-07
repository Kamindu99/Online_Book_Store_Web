import { useState } from 'react';

// material-ui
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

// third-party
import { FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';

// project imports
import { useTheme } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';
import VehicleRegistrationSingleFileUpload from './DocumentForm-fileUploads/VehicleRegistration-SingleFileUpload';
import NicFrontSingleFileUpload from './DocumentForm-fileUploads/NICFront-SingleFileUpload';
import NicBackSingleFileUpload from './DocumentForm-fileUploads/NICBack-SingleFileUpload';
import Usage, { UsageType } from 'data/usage';
import vehicleModels, { VehicleModelsType } from 'data/vehicleModels';
import _ from 'lodash';
import AlertNext from '../AlertNext';
import AlertSave from '../AlertSave';

// ==============================|| VALIDATION WIZARD - PAYMENT ||============================== //
const getInitialValues = (documentData: FormikValues | null) => {
  const newDocuments = {
    yourVehicle: 'registered',
    chassisNumber: '',
    vehicleNumber: '',
    vehicleType: 'Motor Cycle',
    vehicleMake: undefined,
    vehicleModel: undefined,
    usage: undefined,
    nicFrontFile: null,
    nicBackFile: null,
    vehicleRegistrationFile: null,
    termsCheck: false
  };

  if (documentData) {
    return _.merge({}, newDocuments, documentData);
  }

  return newDocuments;
};

export type DocumentData = {
  yourVehicle?: string;
  chassisNumber?: string;
  vehicleNumber?: string;
  vehicleType?: string;
  vehicleMake?: number;
  vehicleModel?: number;
  usage?: number;
  nicFrontFile?: File[] | null;
  nicBackFile?: File[] | null;
  vehicleRegistrationFile?: File[] | null;
  termsCheck?: boolean;
};

interface DocumentFormProps {
  documentData: DocumentData;
  setDocumentData: (d: DocumentData) => void;
  handleNext: () => void;
  handleBack: () => void;
  setErrorIndex: (i: number | null) => void;
}

const DocumentForm = ({ documentData, setDocumentData, handleNext, handleBack, setErrorIndex }: DocumentFormProps) => {
  const theme = useTheme();

  const DocumentValidationSchema = Yup.object().shape({
    vehicleType: Yup.string().required('Vehicle Type is required'),
    vehicleMake: Yup.number().max(255).required('Vehicle Make is required'),
    vehicleModel: Yup.number().required('Vehicle Model is required'),
    usage: Yup.number().required('Vehicle Usage is required'),
    termsCheck: Yup.boolean().oneOf([true], 'Please check terms and conditions'),
    chassisNumber: Yup.string().test('chassis-number', 'Chassis Number is required', function (value) {
      const yourVehicle = this.parent.yourVehicle;
      if (yourVehicle === 'un-registered') {
        return !!value;
      }
      return true;
    }),
    vehicleNumber: Yup.string().test('vehicle-number', 'Vehicle Number is required', function (value) {
      const yourVehicle = this.parent.yourVehicle;
      if (yourVehicle === 'registered') {
        if (!value) {
          return false;
        }
      }
      return true;
    }),
    nicFrontFile: Yup.mixed().required('NIC (Front side) is required'),
    nicBackFile: Yup.mixed().required('NIC (Back side) is required'),
    vehicleRegistrationFile: Yup.mixed().required('Vehicle Registrations is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(documentData!),
    validationSchema: DocumentValidationSchema,
    onSubmit: (values) => {
      console.log('document-data', values);
      setDocumentData({
        yourVehicle: values.yourVehicle,
        chassisNumber: values.chassisNumber,
        vehicleNumber: values.vehicleNumber,
        vehicleType: values.vehicleType,
        vehicleMake: values.vehicleMake,
        vehicleModel: values.vehicleModel,
        usage: values.usage,
        nicFrontFile: values.nicFrontFile,
        nicBackFile: values.nicBackFile,
        vehicleRegistrationFile: values.vehicleRegistrationFile,
        termsCheck: values.termsCheck
      });
      setOpenNextAlert(true);
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

  // save , next alert
  const [openSaveAlert, setOpenSaveAlert] = useState(false);

  const handleSaveAlertClose = () => {
    setOpenSaveAlert(!openSaveAlert);
  };

  const [openNextAlert, setOpenNextAlert] = useState(false);

  const handleNextAlertClose = () => {
    setOpenNextAlert(!openNextAlert);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                You're Vehicle <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <FormControl>
                <RadioGroup row aria-label="your-vehicle" {...formik.getFieldProps('yourVehicle')} name="yourVehicle" id="yourVehicle">
                  <FormControlLabel value="un-registered" control={<Radio />} label="Un Registered" />
                  <FormControlLabel value="registered" control={<Radio />} label="Registered" />
                </RadioGroup>
              </FormControl>
              {formik.errors.yourVehicle && (
                <FormHelperText error id="standard-weight-helper-text-email-login">
                  {' '}
                  {formik.errors.yourVehicle}{' '}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          {formik.values.yourVehicle === 'un-registered' && (
            <Grid item xs={12} sm={12}>
              <Stack spacing={0.5}>
                <InputLabel>
                  Chassis Number <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <TextField
                  id="chassisNumber"
                  name="chassisNumber"
                  placeholder="Chassis Number *"
                  value={formik.values.chassisNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.chassisNumber && Boolean(formik.errors.chassisNumber)}
                  helperText={formik.touched.chassisNumber && formik.errors.chassisNumber}
                  fullWidth
                />
              </Stack>
            </Grid>
          )}
          {formik.values.yourVehicle === 'registered' && (
            <Grid item xs={12} sm={12}>
              <Stack spacing={0.5}>
                <InputLabel>
                  Vehicle Number <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <TextField
                  id="vehicleNumber"
                  name="vehicleNumber"
                  placeholder="Vehicle Number *"
                  value={formik.values.vehicleNumber}
                  onChange={formik.handleChange}
                  error={formik.touched.vehicleNumber && Boolean(formik.errors.vehicleNumber)}
                  helperText={formik.touched.vehicleNumber && formik.errors.vehicleNumber}
                  fullWidth
                />
              </Stack>
            </Grid>
          )}
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                Vehicle Type <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="vehicleType"
                name="vehicleType"
                placeholder="Vehicle Type *"
                value={formik.values.vehicleType}
                onChange={formik.handleChange}
                fullWidth
                disabled={true}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="vehicleMake">
                Vehicle Make <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <Autocomplete
                fullWidth
                id="vehicleMake"
                value={vehicleModels.find((option) => option.id === formik.values.vehicleMake) || null}
                onChange={(event: any, newValue: VehicleModelsType | null) => {
                  formik.setFieldValue('vehicleMake', newValue?.id);
                }}
                options={vehicleModels}
                getOptionLabel={(item) => `${item.description}`}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Select Category"
                      sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                    />
                  );
                }}
              />
              {formik.touched.vehicleMake && formik.errors.vehicleMake && (
                <FormHelperText error id="helper-text-vehicleMake">
                  {formik.errors.vehicleMake}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="vehicleModel">
                Vehicle Model <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <Autocomplete
                fullWidth
                id="vehicleModel"
                value={vehicleModels.find((option) => option.id === formik.values.vehicleModel) || null}
                onChange={(event: any, newValue: VehicleModelsType | null) => {
                  formik.setFieldValue('vehicleModel', newValue?.id);
                }}
                options={vehicleModels}
                getOptionLabel={(item) => `${item.description}`}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Select Category"
                      sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                    />
                  );
                }}
              />
              {formik.touched.vehicleModel && formik.errors.vehicleModel && (
                <FormHelperText error id="helper-text-vehicleModel">
                  {formik.errors.vehicleModel}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={1.25}>
              <InputLabel htmlFor="usage">
                Usage <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <Autocomplete
                fullWidth
                id="usage"
                value={Usage.find((option) => option.id === formik.values.usage) || null}
                onChange={(event: any, newValue: UsageType | null) => {
                  formik.setFieldValue('usage', newValue?.id);
                }}
                options={Usage}
                getOptionLabel={(item) => `${item.description}`}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      placeholder="Select Category"
                      sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                    />
                  );
                }}
              />
              {formik.touched.usage && formik.errors.usage && (
                <FormHelperText error id="helper-text-usage">
                  {formik.errors.usage}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          {/* ////////////////////// nic front side/////////////////////////////////// */}
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel>NIC</InputLabel>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                {' '}
                Upload front side of your NIC <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <NicFrontSingleFileUpload
                setFieldValue={formik.setFieldValue}
                file={formik.values.nicFrontFile}
                error={formik.touched.nicFrontFile && !!formik.errors.nicFrontFile}
              />

              {formik.touched.nicFrontFile && formik.errors.nicFrontFile && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {formik.errors.nicFrontFile}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          {/* ////////////////////// nic back side/////////////////////////////////// */}
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                {' '}
                Upload opposite side of your NIC <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <NicBackSingleFileUpload
                setFieldValue={formik.setFieldValue}
                file={formik.values.nicBackFile}
                error={formik.touched.nicBackFile && !!formik.errors.nicBackFile}
              />
              {formik.touched.nicBackFile && formik.errors.nicBackFile && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {formik.errors.nicBackFile}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          {/* ////////////////////// VEHICLE REGISTARTION /////////////////////////////////// */}
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <InputLabel sx={{ pb: 2 }}>
                Vehicle Registration <span style={{ color: 'red' }}>*</span>
              </InputLabel>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Stack spacing={0.5}>
              <VehicleRegistrationSingleFileUpload
                setFieldValue={formik.setFieldValue}
                file={formik.values.vehicleRegistrationFile}
                error={formik.touched.vehicleRegistrationFile && !!formik.errors.vehicleRegistrationFile}
              />
              {formik.touched.vehicleRegistrationFile && formik.errors.vehicleRegistrationFile && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {formik.errors.vehicleRegistrationFile}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" sx={{ ml: -1 }}>
              <Checkbox
                sx={{ '& .css-1vjb4cj': { borderRadius: '2px' } }}
                {...formik.getFieldProps('termsCheck')}
                checked={formik.values.termsCheck}
              />
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
                  {formik.values.vehicleType !== 'Motor Car' && (
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <ul style={{ listStyleType: 'disc', textAlign: 'justify' }}>
                          <li style={{ marginBottom: '15px' }}>
                            I / We hereby confirm that the details and particulars provided herein are true and accurate and I / We have not
                            suppressed or misstated any material fact.
                          </li>
                          <li style={{ marginBottom: '15px' }}>
                            I / We undertake that the vehicle or vehicles to be insured shall not be driven by any person whom to my / our
                            knowledge has been refused any motor vehicle insurance or continuance thereof.
                          </li>
                          <li style={{ marginBottom: '15px' }}>
                            I / We hereby agree that this declaration provided electronically shall form the basis of the contract between
                            me / us and HNB General Insurance Ltd. and non-disclosure and/or misrepresentation and/or breach of utmost good
                            faith shall render the contract of insurance null and void.
                          </li>
                        </ul>
                      </DialogContentText>
                    </DialogContent>
                  )}
                  {formik.values.vehicleType === 'Motor Car' && (
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        <ul style={{ listStyleType: 'none', textAlign: 'justify', padding: '0' }}>
                          <li style={{ marginBottom: '15px' }}>
                            I hereby confirm to take full responsibility to settle all due government luxury/semi luxury taxes within the
                            set timelines.
                          </li>
                          <li style={{ marginBottom: '15px' }}>
                            I do understand and fully aware that, failing to pay due taxes on or before 60 days from the anniversary date of
                            first registration date of the said vehicle or 31st March whichever comes first, will result in penalties being
                            charged to the respective tax amount which I will be liable to settle.
                          </li>
                          <li style={{ marginBottom: '15px' }}>
                            I / We hereby confirm that the details and particulars provided herein are true and accurate and I / We have not
                            suppressed or misstated any material fact. I / We undertake that the vehicle or vehicles to be insured shall not
                            be driven by any person whom to my / our knowledge has been refused any motor vehicle insurance or continuance
                            thereof.
                          </li>
                          <li style={{ marginBottom: '15px' }}>
                            I / We hereby agree that this declaration provided electronically shall form the basis of the contract between
                            me / us and HNB General Insurance Ltd. and non disclosure and/or misrepresentation and/or breach of utmost good
                            faith shall render the contract of insurance null and void.
                          </li>
                        </ul>
                      </DialogContentText>
                    </DialogContent>
                  )}
                  <Divider />
                  <DialogActions>
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ width: 1, px: 1.5, py: 0.75 }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleClose();
                          formik.setFieldValue('termsCheck', true);
                        }}
                      >
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
              <Stack direction="row" justifyContent="end">
                <AnimateButton>
                  <Button
                    variant="contained"
                    type="button"
                    sx={{ my: 3, ml: 1 }}
                    onClick={() => {
                      setOpenSaveAlert(true);
                    }}
                  >
                    Save
                  </Button>
                </AnimateButton>
                <AnimateButton>
                  <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                    Next
                  </Button>
                </AnimateButton>
              </Stack>
              <AlertNext open={openNextAlert} handleClose={handleNextAlertClose} handleNext={handleNext} />
              <AlertSave open={openSaveAlert} handleClose={handleSaveAlertClose} />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default DocumentForm;
