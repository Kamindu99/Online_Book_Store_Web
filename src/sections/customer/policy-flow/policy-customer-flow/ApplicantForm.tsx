// material-ui
import { Button, Grid, InputLabel, Stack, TextField } from '@mui/material';

// third-party
import { FormikValues, useFormik } from 'formik';
import * as yup from 'yup';

// project imports

import AnimateButton from 'components/@extended/AnimateButton';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router';

// ==============================|| Applicant Form  ||============================== //

const getInitialValues = (applicantData: FormikValues | null) => {
  const newApplicant = {
    referenceNumber: 'REFERENCE-1234',
    nicNumber: '',
    firstName: '',
    lastName: '',
    dob: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    emailAddress: '',
    phoneNumber: ''
  };

  if (applicantData) {
    return _.merge({}, newApplicant, applicantData);
  }

  return newApplicant;
};

export type ApplicantData = {
  referenceNumber?: number | string;
  nicNumber?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  emailAddress?: string;
  phoneNumber?: string;
};

interface ApplicantFormProps {
  applicantData: ApplicantData;
  setApplicantData: (d: ApplicantData) => void;
  handleNext: () => void;
  setErrorIndex: (i: number | null) => void;
}

const ApplicantForm = ({ applicantData, setApplicantData, handleNext, setErrorIndex }: ApplicantFormProps) => {
  const navigation = useNavigate();
  const { policyCategoryId } = useParams();

  const ApplicantValidationSchema = yup.object().shape({
    referenceNumber: yup.string(),
    nicNumber: yup
      .string()
      .matches(/^(?:\d{9}[VvXx]|20\d{10})$/, 'Invalid NIC format')
      .required('NIC Number is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    dob: yup.string().required('Date of Birth is required'),
    addressLine1: yup.string().required('Address Line 01 is required'),
    addressLine2: yup.string().required('Address Line 02 is required'),
    addressLine3: yup.string().required('Address Line 03 is required'),
    emailAddress: yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: yup
      .string()
      .matches(/^(?:7|0|(?:\+94))[0-9]{9,10}$/, 'Invalid Phone Number format')
      .required('Phone Number is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(applicantData!),
    validationSchema: ApplicantValidationSchema,
    onSubmit: (values) => {
      console.log('applicant-data', values);

      setApplicantData({
        referenceNumber: values.referenceNumber,
        nicNumber: values.nicNumber,
        firstName: values.firstName,
        lastName: values.lastName,
        dob: values.dob,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        addressLine3: values.addressLine3,
        emailAddress: values.emailAddress,
        phoneNumber: values.phoneNumber
      });
      handleNext();
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          {/* reference Number should be created when moving to the next page */}

          {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
          </Grid> */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                NIC Number <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="nicNumber"
                name="nicNumber"
                placeholder="xxxxxxxxxxxxx / xxxxxxxxx (v/V)"
                value={formik.values.nicNumber}
                onChange={formik.handleChange}
                error={formik.touched.nicNumber && Boolean(formik.errors.nicNumber)}
                helperText={formik.touched.nicNumber && formik.errors.nicNumber}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                First Name <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="firstName"
                name="firstName"
                placeholder="John"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                Last Name <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="lastName"
                name="lastName"
                placeholder="Doe"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                Date of Birth <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="dob"
                type="date"
                name="dob"
                placeholder="Date of Birth *"
                value={formik.values.dob}
                onChange={formik.handleChange}
                error={formik.touched.dob && Boolean(formik.errors.dob)}
                helperText={formik.touched.dob && formik.errors.dob}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>Postal Address</InputLabel>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                Address Line 01 <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="addressLine1"
                name="addressLine1"
                placeholder="Address Line 01"
                value={formik.values.addressLine1}
                onChange={formik.handleChange}
                error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                Address Line 02 <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="addressLine2"
                name="addressLine2"
                placeholder="Address Line 02"
                value={formik.values.addressLine2}
                onChange={formik.handleChange}
                error={formik.touched.addressLine2 && Boolean(formik.errors.addressLine2)}
                helperText={formik.touched.addressLine2 && formik.errors.addressLine2}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                Address Line 03 <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="addressLine3"
                name="addressLine3"
                placeholder="Address Line 03"
                value={formik.values.addressLine3}
                onChange={formik.handleChange}
                error={formik.touched.addressLine3 && Boolean(formik.errors.addressLine3)}
                helperText={formik.touched.addressLine3 && formik.errors.addressLine3}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                E mail Address <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="emailAddress"
                name="emailAddress"
                placeholder="example@gamil.com"
                value={formik.values.emailAddress}
                onChange={formik.handleChange}
                error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Stack spacing={0.5}>
              <InputLabel>
                Phone Number <span style={{ color: 'red' }}>*</span>
              </InputLabel>
              <TextField
                id="phoneNumber"
                name="phoneNumber"
                placeholder="+94 XX XXX XXXX"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                fullWidth
                autoComplete="given-name"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={() => {
                  navigation(`/customer/policy-flow/categories/${policyCategoryId}/sub-categories`);
                }}
                sx={{ my: 3, ml: 1 }}
              >
                Back
              </Button>
              <AnimateButton>
                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                  Save & Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ApplicantForm;
