// material-ui
//import { useTheme } from '@mui/material/styles';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  // FormControl,
  // FormControlLabel,
  FormHelperText,
  Grid,
  //InputAdornment,
  InputLabel,
  //  RadioGroup,
  Stack,
  //  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import {
  LocalizationProvider,
} from '@mui/x-date-pickers';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports
//import ColorPalette from './ColorPalette';
import IconButton from 'components/@extended/IconButton';
import { dispatch } from 'store';

// assets
import {
  // CalendarOutlined,
  DeleteFilled
} from '@ant-design/icons';

// types
import { addCalendarCode, deleteCalendarCode, updateCalendarCode } from 'store/reducers/system-calendar';
import { DateRange } from 'types/calendar';

// constant
const getInitialValues = (event: FormikValues | null, range: DateRange | null) => {
  const newEvent = {
    title: '',
    description: '',
    color: '#1890ff',
    textColor: '#fff',
    allDay: false,
    start: event?.startDate ? event?.startDate : new Date().toISOString().split('T')[0],
    end: range ? new Date(range.end) : new Date()
  };

  if (event || range) {
    return _.merge(newEvent, {
      title: event?.title,
      description: event?.description,
      color: event?.color,
      textColor: event?.textColor,
      allDay: true,
      start: range?.start,
      end: range?.start
    }
    );
  }

  return newEvent;
};

// ==============================|| CALENDAR EVENT ADD / EDIT / DELETE ||============================== //

export interface AddEventFormProps {
  event?: FormikValues | null;
  range: DateRange | null;
  onCancel: () => void;
}

const AddEventFrom = ({ event, range, onCancel }: AddEventFormProps) => {

  const isCreating = !event;
  const EventSchema = Yup.object().shape({
    title: Yup.string().required('Reson is required'),
  });

  const deleteHandler = () => {
    try {
      dispatch(deleteCalendarCode(event?.id));
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: getInitialValues(event!, range),
    validationSchema: EventSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        const newEvent = {
          reason: values.title,
          holidayDate: values.start,
        };
        if (event) {
          dispatch(updateCalendarCode(event.id, {
            ...event,
            reason: values.title,
            holidayDate: values.start
          }));
        } else {
          dispatch(addCalendarCode(newEvent));
        }
        resetForm()
        setSubmitting(false);
        onCancel();
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <DialogTitle>{event ? 'Edit Event' : 'Add Event'}</DialogTitle>
          <Divider />
          <DialogContent sx={{ p: 2.5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="cal-start-date"> Date</InputLabel>
                  <TextField
                    id="start"
                    type="date"
                    InputLabelProps={{
                      shrink: true
                    }}
                    {...getFieldProps('start')}
                    onChange={(e) => {
                      formik.setFieldValue('start', e.target.value);
                    }}
                  />
                  {touched.start && errors.start && <FormHelperText error={true}>{errors.start as string}</FormHelperText>}
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack spacing={1.25}>
                  <InputLabel htmlFor="cal-title">Reason</InputLabel>
                  <TextField
                    fullWidth
                    id="cal-title"
                    placeholder="Reason"
                    {...getFieldProps('title')}
                    error={Boolean(touched.title && errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2.5 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                {!isCreating && (
                  <Tooltip title="Delete Event" placement="top">
                    <IconButton onClick={deleteHandler} size="large" color="error">
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
                  <Button type="submit" variant="contained" disabled={isSubmitting} >
                    {event ? 'Edit' : 'Add'}
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </DialogActions>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
};

export default AddEventFrom;
