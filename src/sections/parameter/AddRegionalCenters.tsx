import { useState} from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,

  FormLabel,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import _ from 'lodash';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider, FormikValues } from 'formik';

// project imports
import AlertRegionalCenterDelete from './AlertRegionalCentersDelete';
import IconButton from 'components/@extended/IconButton';

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { CameraOutlined, DeleteFilled } from '@ant-design/icons';

// types
import { ThemeMode } from 'types/config';


// constant
const getInitialValues = (RegionalCenters: FormikValues | null) => {
  const newRegionalCenter = {
    officecode: '',
    description: '',
    orderstatus: ''
  };

  if (RegionalCenters) {
    newRegionalCenter.officecode = RegionalCenters.fatherName;
    return _.merge({}, newRegionalCenter, RegionalCenters);
  }

  return newRegionalCenter;
};

const allStatus = ['Reject', 'Pending', 'Active'];

// ==============================|| RegionalCenter ADD / EDIT ||============================== //

export interface Props {
  RegionalCenters?: any;
  onCancel: () => void;
}

const AddRegionalCenter = ({ RegionalCenters, onCancel }: Props) => {
  const theme = useTheme();
  const isCreating = !RegionalCenters;


  const RegionalCenterSchema = Yup.object().shape({
    officecode: Yup.string().max(255).required('Zonal Office Code is required.'),
    orderstatus: Yup.string().required('Status is required'),
    description: Yup.string().max(255).required('Description is required'),
  });

  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
    onCancel();
  };

  const formik = useFormik({
    initialValues: getInitialValues(RegionalCenters!),
    validationSchema: RegionalCenterSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        // const newRegionalCenter = {
        //   name: values.name,
        //   email: values.email,
        //   location: values.location,
        //   orderStatus: values.orderStatus
        // };

        if (RegionalCenters) {
          // dispatch(updateRegionalCenter(RegionalCenters.id, newRegionalCenter)); - update
          dispatch(
            openSnackbar({
              open: true,
              message: 'Regional Center updated successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        } else {
          // dispatch(createRegionalCenter(newRegionalCenter)); - add
          dispatch(
            openSnackbar({
              open: true,
              message: 'Regional Center added successfully.',
              variant: 'alert',
              alert: {
                color: 'success'
              },
              close: false
            })
          );
        }

        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogTitle>{RegionalCenters ? 'Edit Regional Office' : 'New Regional Office'}</DialogTitle>
            <Divider />
            <DialogContent sx={{ p: 2.5 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={2}>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <FormLabel
                      htmlFor="change-avtar"
                      sx={{
                        position: 'relative',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        '&:hover .MuiBox-root': { opacity: 1 },
                        cursor: 'pointer'
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                          width: '100%',
                          height: '100%',
                          opacity: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Stack spacing={0.5} alignItems="center">
                          <CameraOutlined style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                          <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                        </Stack>
                      </Box>
                    </FormLabel>

                  </Stack>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="zonal-office-code">Zonal Office Code</InputLabel>
                        <TextField
                          fullWidth
                          id="zonal-office-code"
                          placeholder="Enter Zonal Office Code"
                          {...getFieldProps('officecode')}
                          error={Boolean(touched.officecode && errors.officecode)}
                          helperText={touched.officecode && errors.officecode}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <TextField
                          fullWidth
                          id="description"
                          placeholder="Enter Description"
                          {...getFieldProps('description')}
                          error={Boolean(touched.description && errors.description)}
                          helperText={touched.description && errors.description}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={1.25}>
                        <InputLabel htmlFor="RegionalCenters-orderStatus">Status</InputLabel>
                        <FormControl fullWidth>
                          <Select
                            id="column-hiding"
                            displayEmpty
                            {...getFieldProps('orderstatus')}
                            onChange={(event: SelectChangeEvent<string>) => setFieldValue('orderstatus', event.target.value as string)}
                            input={<OutlinedInput id="select-column-hiding" placeholder="Sort by" />}
                            renderValue={(selected) => {
                              if (!selected) {
                                return <Typography variant="subtitle1">Select Status</Typography>;
                              }

                              return <Typography variant="subtitle2">{selected}</Typography>;
                            }}
                          >
                            {allStatus.map((column: any) => (
                              <MenuItem key={column} value={column}>
                                <ListItemText primary={column} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        {touched.orderstatus && errors.orderstatus && (
                          <FormHelperText error id="standard-weight-helper-text-email-login" sx={{ pl: 1.75 }}>
                            {errors.orderstatus}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>


                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  {!isCreating && (
                    <Tooltip title="Delete RegionalCenter" placement="top">
                      <IconButton onClick={() => setOpenAlert(true)} size="large" color="error">
                        <DeleteFilled />
                      </IconButton>
                    </Tooltip>
                  )}
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Button color="error" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                      {RegionalCenters ? 'Edit' : 'Add'}
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </DialogActions>
          </Form>
        </LocalizationProvider>
      </FormikProvider>
      {!isCreating && <AlertRegionalCenterDelete title={RegionalCenters.id} open={openAlert} handleClose={handleAlertClose} />}
    </>
  );
};

export default AddRegionalCenter;
