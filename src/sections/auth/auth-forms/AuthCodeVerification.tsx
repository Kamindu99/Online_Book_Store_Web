import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';

// third-party
import OtpInput from 'react18-input-otp';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

// types
import { ThemeMode } from 'types/config';
import useAuth from 'hooks/useAuth';
import { openSnackbar } from 'store/reducers/snackbar';
import { dispatch } from 'store';
import { useNavigate } from 'react-router';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = () => {
  const theme = useTheme();
  const [otp, setOtp] = useState<string>();
  const navigate = useNavigate();
  const { verifyOtp, resetPasswordUser } = useAuth();

  const getSessionValue = (key: string) => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  };

  const username = getSessionValue('userName');

  const [timer, setTimer] = useState(30); // Timer set to 30 seconds
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  const setSessionValue = (key: string, value: string) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendEnabled(true); // Enable resend button when timer reaches 0
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Validate OTP
  const validateOtp = async (otp: string) => {
    try {
      await verifyOtp(username, otp).then(() => {
        dispatch(
          openSnackbar({
            open: true,
            message: 'OTP Verified Successfully',
            variant: 'alert',
            alert: {
              color: 'success'
            },
            close: false
          })
        );
        setTimeout(() => {
          navigate(`/reset-password`, { replace: true });
          setSessionValue("otp", otp)
        }, 1500);
      },
        (err: any) => {
          dispatch(
            openSnackbar({
              open: true,
              message: err.message,
              variant: 'alert',
              alert: {
                color: 'error'
              },
              close: false
            })
          );
        }
      );
    } catch (err) {
      dispatch(
        openSnackbar({
          open: true,
          message: 'Error validating OTP. Please try again.',
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: false
        })
      );
      console.log(err);
    }
  };

  // Function to resend OTP
  const handleResendOTP = async () => {
    if (isResendEnabled) {
      try {
        setTimer(30); // Reset timer to 30 seconds
        setIsResendEnabled(false); // Disable resend until timer reaches 0
        await resetPasswordUser(username).then(() => {
          dispatch(
            openSnackbar({
              open: true,
              message: 'Resent OTP Successfully',
              variant: 'alert',
              alert: { color: 'success' },
              close: false
            })
          );
        }).catch((err: any) => {
          dispatch(
            openSnackbar({
              open: true,
              message: err.message,
              variant: 'alert',
              alert: { color: 'error' },
              close: false
            })
          );
        });
      } catch (err) {
        dispatch(
          openSnackbar({
            open: true,
            message: 'Error resending OTP. Please try again.',
            variant: 'alert',
            alert: { color: 'error' },
            close: false
          })
        );
        console.log(err);
      }
    }
  };

  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.grey[200] : theme.palette.grey[300];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <OtpInput
          value={otp}
          onChange={(otp: string) => setOtp(otp)}
          numInputs={6}
          containerStyle={{ justifyContent: 'space-between' }}
          inputStyle={{
            width: '100%',
            margin: '8px',
            padding: '10px',
            border: `1px solid ${borderColor}`,
            borderRadius: 4,
            ':hover': {
              borderColor: theme.palette.primary.main
            }
          }}
          focusStyle={{
            outline: 'none',
            boxShadow: theme.customShadows.primary,
            border: `1px solid ${theme.palette.primary.main}`
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <AnimateButton>
          <Button disableElevation fullWidth size="large" type="submit" variant="contained" onClick={() => { validateOtp(otp!) }}>
            Continue
          </Button>
        </AnimateButton>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline">
          <Typography>Did not receive the email?</Typography>
          <Typography
            variant="body1"
            sx={{ minWidth: 85, ml: 2, textDecoration: 'none', cursor: 'pointer', color: isResendEnabled ? 'blue' : 'grey.500' }}
            onClick={handleResendOTP}
          >
            {isResendEnabled ? 'Resend code' : `Resend in ${timer}s`}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default AuthCodeVerification;
