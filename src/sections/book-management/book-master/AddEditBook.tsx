import { useEffect, useState } from 'react';

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
import AlertBookDelete from './AlertBookDelete';

// third-party
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports

import IconButton from 'components/@extended/IconButton';

import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { DeleteFilled } from '@ant-design/icons';
import { createBook, toInitialState, updateBook } from 'store/reducers/book-master';

// types

// constant
const getInitialValues = (book: FormikValues | null) => {
    const newBook = {
        bookId: undefined,
        bookName: '',
        author: '',
        price: '',
        addedDate: '',
        statusId: 1
    };
    if (book) {
        return _.merge({}, newBook, book);
    }
    return newBook;
};

// ==============================|| Book ADD / EDIT ||============================== //

export interface Props {
    book?: any;
    onCancel: () => void;
}

const AddEditBook = ({ book, onCancel }: Props) => {

    const dispatch = useDispatch();
    const { error, isLoading, success } = useSelector(state => state.book)

    const isCreating = !book;

    const BookSchema = Yup.object().shape({
        bookName: Yup.string().max(255).required('Name is required'),
        author: Yup.string().max(255).required('Author is required'),
        price: Yup.string().max(255).required('Price is required'),
        addedDate: Yup.string().max(255).required('Added Date is required')
    });

    const [openAlert, setOpenAlert] = useState(false);

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
        onCancel();
    };

    const formik = useFormik({
        initialValues: getInitialValues(book!),
        validationSchema: BookSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                const newBook = {
                    bookId: values.bookId,
                    bookName: values.bookName,
                    author: values.author,
                    price: values.price,
                    addedDate: values.addedDate,
                    statusId: values.statusId
                };

                if (book) {
                    dispatch(updateBook(newBook));
                } else {
                    dispatch(createBook(newBook));
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
        return <>Loading...</>
    }

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{book ? 'Edit Book Details' : 'New Book Details'}</DialogTitle>
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="bookName"> Book Name</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="bookName"
                                            placeholder="Enter Book Name"
                                            {...getFieldProps('bookName')}
                                            error={Boolean(touched.bookName && errors.bookName)}
                                            helperText={touched.bookName && errors.bookName}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="author">Author</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="author"
                                            placeholder="Enter Book Author"
                                            {...getFieldProps('author')}
                                            error={Boolean(touched.author && errors.author)}
                                            helperText={touched.author && errors.author}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="price">Price</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="price"
                                            placeholder="Enter Book Price"
                                            {...getFieldProps('price')}
                                            error={Boolean(touched.price && errors.price)}
                                            helperText={touched.price && errors.price}
                                        />
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="addedDate">Added Date</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="addedDate"
                                            placeholder="Enter Book Added Date"
                                            {...getFieldProps('addedDate')}
                                            error={Boolean(touched.addedDate && errors.addedDate)}
                                            helperText={touched.addedDate && errors.addedDate}
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
                                        <Tooltip title="Delete Book" placement="top">
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
                                            {book ? 'Edit' : 'Add'}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogActions>
                    </Form>
                </LocalizationProvider>
            </FormikProvider>
            {!isCreating && <AlertBookDelete title={book.fatherName} open={openAlert} handleClose={handleAlertClose} deleteId={book?.bookId} />}
        </>
    );
};

export default AddEditBook;
