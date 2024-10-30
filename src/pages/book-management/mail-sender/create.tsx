
// material-ui
import {
    Button,
    Grid,
    InputLabel,
    Stack,
    TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports
import { dispatch, useSelector } from 'store';

// assets
import MainCard from 'components/MainCard';
import { useEffect } from 'react';
import { toInitialState } from 'store/reducers/book-master';
import { createSendMail } from 'store/reducers/send-mail';
import { openSnackbar } from 'store/reducers/snackbar';
import { Loading } from 'utils/loading';

// types

// constant
const getInitialValues = (categoryCode: FormikValues | null) => {

    const newCategoryCode = {
        _id: '',
        subject: '',
        message: '',
    };

    if (categoryCode) {
        return _.merge({}, newCategoryCode, categoryCode);
    }

    return newCategoryCode;
};

// ==============================|| Category ADD / EDIT ||============================== //

const MailSenderBook = () => {

    const CategoryCodeSchema = Yup.object().shape({
        subject: Yup.string().max(255).required('Subject is required'),
        message: Yup.string().max(255).required('Message is required'),
    });

    const formik = useFormik({
        initialValues: getInitialValues(null),
        validationSchema: CategoryCodeSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                dispatch(createSendMail({
                    subject: values.subject,
                    message: values.message
                }));
                resetForm()
                getInitialValues(null)
                dispatch(toInitialState());
                setSubmitting(false);
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { error, isLoading, success } = useSelector(state => state.bookTransfer)

    useEffect(() => {
        if (error != null) {
            let defaultErrorMessage = "ERROR";
            // @ts-ignore
            const errorExp = error as Template1Error
            if (errorExp.message) {
                defaultErrorMessage = errorExp.message
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
        }
    }, [success])

    if (isLoading) {
        return <Loading />
    }

    const { handleSubmit, isSubmitting } = formik;

    return (
        <>
            <MainCard content={false} sx={{ padding: '30px' }}>
                <FormikProvider value={formik}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="subject">Subject</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="subject"
                                            type="text"
                                            placeholder="Email Subject"
                                            {...formik.getFieldProps('subject')}
                                            error={Boolean(formik.touched.subject && formik.errors.subject)}
                                            helperText={formik.touched.subject && formik.errors.subject}
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel htmlFor="message">Message</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="message"
                                            type="text"
                                            placeholder="Compose your email"
                                            {...formik.getFieldProps('message')}
                                            multiline
                                            rows={6}
                                            error={Boolean(formik.touched.message && formik.errors.message)}
                                            helperText={formik.touched.message && formik.errors.message}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Grid container justifyContent="flex-end" spacing={2} mt={3}>
                                <Grid item>
                                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </LocalizationProvider>
                </FormikProvider>
            </MainCard>
        </>
    );
};

export default MailSenderBook;
