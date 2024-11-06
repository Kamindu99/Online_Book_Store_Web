import { useNavigate } from 'react-router-dom';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack } from '@mui/material';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

const AuthForgotPassword = () => {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const { isLoggedIn, resetPasswordUser } = useAuth();

  const setSessionValue = (key: string, value: string) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return (
    <>
      <Formik
        initialValues={{
          userId: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          userId: Yup.string().required('Email is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          //setSessionValue("userName", values.userId)
          try {
            await resetPasswordUser(values.userId).then(
              () => {
                setStatus({ success: true });
                setSubmitting(false);
                dispatch(
                  openSnackbar({
                    open: true,
                    message: 'OTP sent Successfully',
                    variant: 'alert',
                    alert: {
                      color: 'success'
                    },
                    close: false
                  })
                );
                setTimeout(() => {
                  navigate(isLoggedIn ? '/code-verification' : `/code-verification`, { replace: true });
                  setSessionValue("userName", values.userId)
                }, 1500);
              },
              (err: any) => {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            );
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
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="userId-forgot">Email Address</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.userId && errors.userId)}
                    id="userId-forgot"
                    type="userId"
                    value={values.userId}
                    name="userId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Email Address"
                    inputProps={{}}
                  />
                  {touched.userId && errors.userId && (
                    <FormHelperText error id="helper-text-userId-forgot">
                      {errors.userId}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}

              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Submit
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

export default AuthForgotPassword;
