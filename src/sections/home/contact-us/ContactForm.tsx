
// material-ui
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';

// material-ui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import * as Yup from 'yup';

// project imports
import { dispatch } from 'store';

// assets
import _ from 'lodash';
import { createContactUs, toInitialState } from 'store/reducers/contact-us';

// ==============================|| CONTACT US - FORM ||============================== //

const getInitialValues = (categoryCode: FormikValues | null) => {

  const newCategoryCode = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  if (categoryCode) {
    return _.merge({}, newCategoryCode, categoryCode);
  }

  return newCategoryCode;
};

function ContactForm() {

  const CategoryCodeSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(null!),
    validationSchema: CategoryCodeSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      try {
        dispatch(createContactUs(
          values.name,
          values.email,
          values.subject,
          values.message
        )).then(() => {
          setSubmitting(false);
          resetForm();
          dispatch(toInitialState());
        });
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

          <Grid item xs={12} sm={12} lg={12}>
            <Stack alignItems="center" justifyContent="center" spacing={2}>
              <Typography color="primary">Get In touch</Typography>
              <Typography align="center" variant="h2">
                Wanigasinghe Book Collection
              </Typography>
              <Typography variant="caption" align="center" color="textSecondary" sx={{ maxWidth: '355px' }}>
                You can contact us using the form below. We will get back to you as soon as possible.
              </Typography>
            </Stack>
          </Grid>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={12}>

              <TextField
                fullWidth
                id="name"
                type='text'
                placeholder="Enter Name"
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />

            </Grid>
            <Grid item xs={12} md={12}>

              <TextField
                fullWidth
                id="email"
                type='text'
                placeholder="Enter Email"
                {...getFieldProps('email')}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

            </Grid>
            <Grid item xs={12} md={12}>

              <TextField
                fullWidth
                id="subject"
                type='text'
                placeholder="Enter Subject"
                {...getFieldProps('subject')}
                error={Boolean(touched.subject && errors.subject)}
                helperText={touched.subject && errors.subject}
              />

            </Grid>
            <Grid item xs={12} md={12}>

              <TextField
                fullWidth
                id="message"
                type='text'
                multiline
                rows={4}
                placeholder="Enter Message"
                {...getFieldProps('message')}
                error={Boolean(touched.message && errors.message)}
                helperText={touched.message && errors.message}
              />

            </Grid>
          </Grid>

          <Grid container justifyContent="space-between" alignItems="center" mt={2}>
            <Grid item>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  Send Message
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </LocalizationProvider>
    </FormikProvider>
  );
}

export default ContactForm;
