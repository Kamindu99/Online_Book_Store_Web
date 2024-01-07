import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  FormHelperText,
  Grid,
  Link,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';

import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';


// ============================|| JWT - REGISTER ||============================ //

const AuthRegister = () => {
  const { register } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();


  // const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // }
  return (
    <>
      <Formik
        initialValues={{
          usertype: '',
          userid: '',
          firstname: '',
          lastname: '',
          email: '',
          countrycode: '',
          phonenumber: '',
          termscondition: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          userid: Yup.string().max(255).required('User Id is required'),
          firstname: Yup.string().max(255).required('First Name is required'),
          lastname: Yup.string().max(255).required('Last Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          usertype: Yup.string().required("User Type is required"),
          countrycode: Yup.string().required("Country Code is required"),
          phonenumber: Yup.number().nullable().required("Phone Number is required."),
          termscondition: Yup.boolean().oneOf([true], 'You need to accept the terms and conditions')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await register(values.email, values.firstname, values.lastname, values.phonenumber);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              dispatch(
                openSnackbar({
                  open: true,
                  message: 'Your registration has been successfully completed.',
                  variant: 'alert',
                  alert: {
                    color: 'success'
                  },
                  close: false
                })
              );

              setTimeout(() => {
                navigate('/login', { replace: true });
              }, 1500);
            }
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="userid-signup">User Type*</InputLabel>
                  <Select
                    id="usertype-login"
                    type='usertype'
                    name="usertype"
                    onBlur={handleBlur}
                    value={values.usertype}
                    label="User Type"
                    error={Boolean(touched.usertype && errors.usertype)}
                    placeholder='select'
                    fullWidth
                    onChange={handleChange}
                    inputProps={{}}
                  >    
                  <MenuItem value={1}>Staff</MenuItem>
                    <MenuItem value={2}>Agent</MenuItem>
                    <MenuItem value={3}>Customer</MenuItem>
                  </Select>
                  {touched.usertype && errors.usertype && (
                    <FormHelperText error id="helper-text-usertype-signup">
                      {errors.usertype}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="userid-signup">User Id*</InputLabel>
                  <OutlinedInput
                    id="userid-login"
                    type="userid"
                    // value={values.userid}
                    name="userid"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter your user id"
                    error={Boolean(touched.userid && errors.userid)}
                    fullWidth
                    inputProps={{}}
                  />
                  {touched.userid && errors.userid && (
                    <FormHelperText error id="helper-text-userid-signup">
                      {errors.userid}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Verify
                  </Button>
                </AnimateButton>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstname-signup">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstname-login"
                    type="firstname"
                    value={values.firstname}
                    name="firstname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={Boolean(touched.firstname && errors.firstname)}
                    placeholder="John"
                    fullWidth
                    inputProps={{}}
                  />
                  {touched.firstname && errors.firstname && (
                    <FormHelperText error id="helper-text-firstname-signup">
                      {errors.firstname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12} md={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastname-signup">Last Name*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.lastname && errors.lastname)}
                    id="lastname-signup"
                    type="lastname"
                    value={values.lastname}
                    name="lastname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Doe"
                    inputProps={{}}
                  />
                  {touched.lastname && errors.lastname && (
                    <FormHelperText error id="helper-text-lastname-signup">
                      {errors.lastname}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                <InputLabel htmlFor="phonenumber-signup">Phone Number *</InputLabel>
                </Stack></Grid>
             
              
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                <Select
                    id="countrycode-login"
                    type='countrycode'
                    name="countrycode"
                    onBlur={handleBlur}
                    value={values.countrycode}
                    label="Country Code"
                    error={Boolean(touched.countrycode && errors.countrycode)}
                    placeholder='+94'
                    fullWidth
                    onChange={handleChange}
                    inputProps={{}}
                  >    
                  <MenuItem value={1}>+94</MenuItem>
                    <MenuItem value={2}>+61</MenuItem>
                    <MenuItem value={3}>+1</MenuItem>
                  </Select>
                  {touched.countrycode && errors.countrycode && (
                    <FormHelperText error id="helper-text-countrycode-signup">
                      {errors.countrycode}
                    </FormHelperText>
                  )}
                </Stack>
                </Grid>
                <Grid item xs={12} md={9}>
                <Stack spacing={1}>

                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.phonenumber && errors.phonenumber)}
                    id="phonenumber-signup"
                    value={values.phonenumber}
                    type='phonenumber'
                    name="phonenumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="769-603-388"
                    inputProps={{}}
                  />
                  {touched.phonenumber && errors.phonenumber && (
                    <FormHelperText error id="helper-text-phonenumber-signup">
                      {errors.phonenumber}
                    </FormHelperText>
                  )}
                </Stack>
   
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="demo@company.com"
                    inputProps={{}}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-signup">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">
                  <Checkbox name='termscondition' id='termscondition-login'  inputProps={{}}/>
                  Agree with  &nbsp;
                  <Link variant="subtitle2" component={RouterLink} to="#">
                    Terms & Conditions
                  </Link>
                  {touched.termscondition && errors.termscondition && (
                    <FormHelperText error id="helper-text-termscondition-signup">
                      {errors.termscondition}
                    </FormHelperText>
                  )}
                </Typography>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Sign Up
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthRegister;
