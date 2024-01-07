import { useEffect, useState, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { dispatch } from 'store';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { openSnackbar } from 'store/reducers/snackbar';

// types
import { StringColorProps } from 'types/password';

// assets
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

// ============================|| STATIC - RESET PASSWORD ||============================ //

const AuthChangePassword = () => {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const { isLoggedIn } = useAuth();

  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const [showoldPassword, setShowOldPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showoldPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showconfirmPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  const changeConfirmPassword = (value: string) => {
    
  };

  const changeOldPassword = (value: string) => {

  };


  useEffect(() => {
    changePassword('');
    changeConfirmPassword('');
    changeOldPassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        oldpassword: '',
        password: '',
        confirmpassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        oldpassword: Yup.string().max(255).required('Old Password is required'),
        password: Yup.string().max(255).required('New Password is required'),
        confirmpassword: Yup.string()
          .required('Confirm Password is required')
          .test('confirmpassword', 'Both Password must be match!', (confirmpassword, yup) => yup.parent.password === confirmpassword)
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // password reset
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);

            dispatch(
              openSnackbar({
                open: true,
                message: 'Successfuly reset password.',
                variant: 'alert',
                alert: {
                  color: 'success'
                },
                close: false
              })
            );

            setTimeout(() => {
              navigate(isLoggedIn ? '/auth/login' : '/login', { replace: true });
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
          <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="old-password-reset">Old Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.oldpassword && errors.oldpassword)}
                  id="password-reset"
                  type={showoldPassword ? 'text' : 'password'}
                  value={values.oldpassword}
                  name="oldpassword"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changeOldPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showoldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter old password"
                />
                {touched.oldpassword && errors.oldpassword && (
                  <FormHelperText error id="helper-text-oldpassword-reset">
                    {errors.oldpassword}
                  </FormHelperText>
                )}
              </Stack>

            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password-reset">New Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-reset"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter new password"
                />
                {touched.password && errors.password && (
                  <FormHelperText error id="helper-text-password-reset">
                    {errors.password}
                  </FormHelperText>
                )}
              </Stack>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="confirm-password-reset">Confirm Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.confirmpassword && errors.confirmpassword)}
                  id="confirm-password-reset"
                  type={showconfirmPassword ? 'text' : 'password'}
                  value={values.confirmpassword}
                  name="confirmpassword"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changeConfirmPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showconfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter confirm password"
                />
                {touched.confirmpassword && errors.confirmpassword && (
                  <FormHelperText error id="helper-text-confirmpassword-reset">
                    {errors.confirmpassword}
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
                  Change Password
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default AuthChangePassword;
