import { useState } from 'react';

// material-ui
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    InputLabel,
    Stack,
    TextField,
    Tooltip
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

import { dispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { DeleteFilled } from '@ant-design/icons';

// types

// constant
const getInitialValues = (customer: FormikValues | null) => {
    const newCustomer = {
        name: '',
        author: '',
        transferedate: '',
        person: '',
        orderStatus: ''
    };

    if (customer) {
        newCustomer.name = customer.name;
        newCustomer.transferedate = customer.transferedate;
        newCustomer.person = customer.person;
        return _.merge({}, newCustomer, customer);
    }

    return newCustomer;
};

// ==============================|| CUSTOMER ADD / EDIT ||============================== //

export interface Props {
    customer?: any;
    onCancel: () => void;
}

const AddEditTransferBook = ({ customer, onCancel }: Props) => {
    const isCreating = !customer;

    const CustomerSchema = Yup.object().shape({
        name: Yup.string().max(255).required('Name is required'),
        author: Yup.string().max(255).required('Author is required'),
        transferedate: Yup.string().max(255).required('Transfer date is required'),
        person: Yup.string().max(255).required('Transferd person is required')
    });

    const [openAlert, setOpenAlert] = useState(false);

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
        onCancel();
    };

    const formik = useFormik({
        initialValues: getInitialValues(customer!),
        validationSchema: CustomerSchema,
        onSubmit: (values, { setSubmitting }) => {
            try {
                // const newCustomer = {
                //   name: values.name,
                //   email: values.email,
                //   location: values.location,
                //   orderStatus: values.orderStatus
                // };

                if (customer) {
                    // dispatch(updateCustomer(customer.id, newCustomer)); - update
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Customer update successfully.',
                            variant: 'alert',
                            alert: {
                                color: 'success'
                            },
                            close: false
                        })
                    );
                } else {
                    // dispatch(createCustomer(newCustomer)); - add
                    dispatch(
                        openSnackbar({
                            open: true,
                            message: 'Customer added successfully.',
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

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{customer ? 'Edit Dispose Details' : 'New Dispose Details'}</DialogTitle>
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="book-name"> Book Name</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="book-name"
                                            placeholder="Enter Book Name"
                                            {...getFieldProps('name')}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="book-athor">Author</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="book-athor"
                                            placeholder="Enter Book Author"
                                            {...getFieldProps('author')}
                                            error={Boolean(touched.author && errors.author)}
                                            helperText={touched.author && errors.author}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="dispose-date">Dispose Date</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="dispose-date"
                                            placeholder="Enter Dispose Date"
                                            {...getFieldProps('transferedate')}
                                            error={Boolean(touched.transferedate && errors.transferedate)}
                                            helperText={touched.transferedate && errors.transferedate}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
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
                                        <Tooltip title="Delete Customer" placement="top">
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
                                            {customer ? 'Edit' : 'Add'}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Form>
                </LocalizationProvider>
            </FormikProvider>
            {!isCreating && <AlertBookDelete title={customer.fatherName} open={openAlert} handleClose={handleAlertClose} />}
        </>
    );
};

export default AddEditTransferBook;
