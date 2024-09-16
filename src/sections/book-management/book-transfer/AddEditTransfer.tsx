import { useEffect, useState } from 'react';

// material-ui
import {
    Autocomplete,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    InputLabel,
    Stack,
    TextField,
    Tooltip,
    useTheme
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AlertBookDelete from './AlertTransferDelete';

// third-party
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports

import IconButton from 'components/@extended/IconButton';

import { dispatch, useSelector } from 'store';

// assets
import { DeleteFilled } from '@ant-design/icons';
import { getBooksFdd } from 'store/reducers/book-master';
import { Books } from 'types/book-master';
import { createBooktransfer, updateBooktransfer } from 'store/reducers/book-transfer';

// types

// constant
const getInitialValues = (booktransfer: FormikValues | null) => {

    const newBooktransfer = {
        bookId: '',
        transferedate: '',
        person: '',
    };

    if (booktransfer) {
        return _.merge({}, newBooktransfer, booktransfer);
    }

    return newBooktransfer;
};

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

export interface Props {
    booktransfer?: any;
    onCancel: () => void;
}

const AddEditTransferBook = ({ booktransfer, onCancel }: Props) => {
    const isCreating = !booktransfer;
    const theme = useTheme()

    const BooktransferSchema = Yup.object().shape({
        transferedate: Yup.string().max(255).required('Transfer date is required'),
        person: Yup.string().max(255).required('Transferd person is required')
    });

    const [openAlert, setOpenAlert] = useState(false);

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
        onCancel();
    };

    const formik = useFormik({
        initialValues: getInitialValues(booktransfer!),
        validationSchema: BooktransferSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (booktransfer) {
                    dispatch(updateBooktransfer(values));
                } else {
                    dispatch(createBooktransfer({
                        bookId: values.bookId,
                        transferedate: values.transferedate,
                        person: values.person
                    }));
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

    const { booksFdd } = useSelector(state => state.book)
    useEffect(() => {
        dispatch(getBooksFdd());
    }, [])

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{booktransfer ? 'Edit Transfer Details' : 'New Transfer Details'}</DialogTitle>
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={3}>

                                <Grid item xs={12} md={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="bookId">
                                            Book Name <span style={{ color: 'red' }}>*</span>
                                        </InputLabel>
                                        <Autocomplete
                                            fullWidth
                                            id="bookId"
                                            value={booksFdd?.find((option) => option._id === formik.values.bookId) || null}
                                            onChange={(event: any, newValue: Books | null) => {
                                                formik.setFieldValue('bookId', newValue?._id);
                                            }}
                                            options={booksFdd || []}
                                            getOptionLabel={(item) => `${item.bookCode} - ${item.bookName}`}
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select Book"
                                                        sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                                                    />
                                                )
                                            }}
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="transferedate">Transfered Date</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="transferedate"
                                            type='date'
                                            placeholder="Enter Transfered Date"
                                            {...getFieldProps('transferedate')}
                                            error={Boolean(touched.transferedate && errors.transferedate)}
                                            helperText={touched.transferedate && errors.transferedate}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="person">Transfered Person</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="person"
                                            placeholder="Enter Transfered Person"
                                            {...getFieldProps('person')}
                                            error={Boolean(touched.person && errors.person)}
                                            helperText={touched.person && errors.person}
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
                                        <Tooltip title="Delete Booktransfer" placement="top">
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
                                            {booktransfer ? 'Edit' : 'Add'}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Form>
                </LocalizationProvider>
            </FormikProvider>
            {!isCreating && <AlertBookDelete title={booktransfer.fatherName} open={openAlert} handleClose={handleAlertClose} />}
        </>
    );
};

export default AddEditTransferBook;
