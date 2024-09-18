import { SyntheticEvent, useEffect, useState } from 'react';

// material-ui
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';

import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { isLowercaseChar, isNumber, isSpecialChar, isUppercaseChar, minLength } from 'utils/password-validation';

// third party
import { Formik } from 'formik';
import * as Yup from 'yup';

// assets
import { CheckOutlined, EyeInvisibleOutlined, EyeOutlined, LineOutlined } from '@ant-design/icons';
import useAuth from 'hooks/useAuth';
import { PasswordChangeSuccess, toInitialState } from 'store/reducers/password-change';

import { APP_DEFAULT_PATH } from 'config';

// ==============================|| TAB - PASSWORD CHANGE ||============================== //

const PasswordChange = () => {
  const handleCancel = () => {
    window.location.href = APP_DEFAULT_PATH;
  };

  const { user } = useAuth();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  const { success, error } = useSelector((state) => state.passwordChange);

  // =================== error catching of the submit ====================================
  useEffect(() => {
    if (error != null) {
      let defaultErrorMessage = 'ERROR';
      // @ts-ignore
      const errorExp = error as Template1Error;
      if (errorExp.message) {
        defaultErrorMessage = errorExp.message;
      }
      dispatch(
        openSnackbar({
          open: true,
          message: defaultErrorMessage,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
      dispatch(toInitialState());
    }
  }, [error]);

  useEffect(() => {
    if (success != null) {
      dispatch(
        openSnackbar({
          open: true,
          message: success,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      dispatch(toInitialState());
      localStorage.removeItem('serviceToken');
      localStorage.removeItem('user');
      setTimeout(() => {
        window.location.replace('https://online-library-webapp.netlify.app/login');
      }, 1500);
    }
  }, [success]);

  const [passwordRules] = useState({
    passwordMaxLength: 15,
    passwordMinLength: 8,
    passwordNumOfCapitalLetters: 3,
    passwordNumOfDigits: 3,
    passwordNumOfSimpleLetters: 3,
    passwordNumOfSpecialCharacter: 2
  });

  return (
    <MainCard title="Change Password">
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          reNewPassword: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          currentPassword: Yup.string().required('Old Password is required'),
          newPassword: Yup.string()
            .required('New Password is required')
            .min(passwordRules.passwordMinLength, `Password must be at least ${passwordRules.passwordMinLength} characters long`)
            .max(passwordRules.passwordMaxLength, `Password must be at most ${passwordRules.passwordMaxLength} characters long`)
            .matches(
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            ),
          reNewPassword: Yup.string()
            .required('Confirm Password is required')
            .test('reNewPassword', `Passwords don't match.`, (reNewPassword: string, yup: any) => yup.parent.newPassword === reNewPassword)
        })}
        onSubmit={async (values) => {
          try {
            dispatch(
              PasswordChangeSuccess({
                reqBody: {
                  currentPassword: values.currentPassword,
                  newPassword: values.newPassword,
                  reNewPassword: values.reNewPassword
                },
                userName: user?.id!
              })
            );
          } catch (error) {
            console.error(error);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item container spacing={3} xs={12} sm={6}>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password-old">Old Password</InputLabel>
                    <OutlinedInput
                      id="password-old"
                      placeholder="Enter Old Password"
                      type={showOldPassword ? 'text' : 'password'}
                      value={values.currentPassword}
                      name="currentPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      //onPaste={(e) => e.preventDefault()}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                            color="secondary"
                          >
                            {showOldPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{ autoComplete: 'new-password', style: { WebkitUserSelect: 'none', userSelect: 'none' } }}
                    />
                    {touched.currentPassword && errors.currentPassword && (
                      <FormHelperText error id="password-old-helper">
                        {errors.currentPassword}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password-password">New Password</InputLabel>
                    <OutlinedInput
                      id="password-password"
                      placeholder="Enter New Password"
                      type={showNewPassword ? 'text' : 'password'}
                      value={values.newPassword}
                      name="newPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onPaste={(e) => e.preventDefault()}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                            color="secondary"
                          >
                            {showNewPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{
                        autoComplete: 'new-password',
                        style: { WebkitUserSelect: 'none', userSelect: 'none' }
                      }}
                    />
                    {touched.newPassword && errors.newPassword && (
                      <FormHelperText error id="password-password-helper">
                        {errors.newPassword}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1.25}>
                    <InputLabel htmlFor="password-confirm">Confirm Password</InputLabel>
                    <OutlinedInput
                      id="password-confirm"
                      placeholder="Enter Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={values.reNewPassword}
                      name="reNewPassword"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onPaste={(e) => e.preventDefault()}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                            color="secondary"
                          >
                            {showConfirmPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      }
                      inputProps={{
                        autoComplete: 'new-password',
                        style: { WebkitUserSelect: 'none', userSelect: 'none' }
                      }}
                    />
                    {touched.reNewPassword && errors.reNewPassword && (
                      <FormHelperText error id="password-confirm-helper">
                        {errors.reNewPassword}
                      </FormHelperText>
                    )}
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ p: { xs: 0, sm: 2, md: 4, lg: 5 } }}>
                  <Typography variant="h5">New Password must contain:</Typography>
                  <List sx={{ p: 0, mt: 1 }}>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: minLength(values.newPassword) ? 'success.main' : 'inherit' }}>
                        {minLength(values.newPassword) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary={`At least ${passwordRules.passwordMinLength} characters`} />{' '}
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: isLowercaseChar(values.newPassword) ? 'success.main' : 'inherit' }}>
                        {isLowercaseChar(values.newPassword) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary="At least 1 lower letter (a-z)" />
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: isUppercaseChar(values.newPassword) ? 'success.main' : 'inherit' }}>
                        {isUppercaseChar(values.newPassword) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary="At least 1 uppercase letter (A-Z)" />
                    </ListItem>
                    <ListItem divider>
                      <ListItemIcon sx={{ color: isNumber(values.newPassword) ? 'success.main' : 'inherit' }}>
                        {isNumber(values.newPassword) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary="At least 1 number (0-9)" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon sx={{ color: isSpecialChar(values.newPassword) ? 'success.main' : 'inherit' }}>
                        {isSpecialChar(values.newPassword) ? <CheckOutlined /> : <LineOutlined />}
                      </ListItemIcon>
                      <ListItemText primary={`At least ${passwordRules.passwordNumOfSpecialCharacter} special characters`} />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                  <Button variant="outlined" color="secondary" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Update Password
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </MainCard>
  );
};

export default PasswordChange;
