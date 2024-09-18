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
    MenuItem,
    Stack,
    TextField,
    useTheme
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
import { getBooksFdd, toInitialState } from 'store/reducers/book-master';
import { createBooktransfer, updateBooktransfer } from 'store/reducers/book-transfer';
import { Books } from 'types/book-master';
import { getUsersFdd } from 'store/reducers/users';
import { Users } from 'types/users';

// types

// constant
const getInitialValues = (booktransfer: FormikValues | null) => {

    const newBooktransfer = {
        bookId: '',
        transferedate: new Date().toISOString().split('T')[0],
        userId: '',
        category: ''
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
    console.log(booktransfer);

    const theme = useTheme()

    const BooktransferSchema = Yup.object().shape({
        transferedate: Yup.string().max(255).required('Transfer date is required'),
        userId: Yup.string().max(255).required('Borrow person is required')
    });

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
                        userId: values.userId
                    }));
                }
                resetForm()
                getInitialValues(null)
                dispatch(toInitialState());
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
        if (formik.values.category === '') {
            setBookList([])
            return
        };
        dispatch(getBooksFdd(formik.values.category));
    }, [formik.values.category])

    const { usersFdd } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getUsersFdd());
    }, [])

    const [bookList, setBookList] = useState<Books[]>([]);

    useEffect(() => {
        if (booktransfer) {
            setBookList([
                {
                    _id: booktransfer.bookId,
                    bookCode: booktransfer.bmBook?.bookCode,
                    bookName: booktransfer.bmBook?.bookName
                },
                ...booksFdd!
            ])
        } else {
            setBookList(booksFdd!)
        }
    }, [booktransfer, booksFdd])

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{booktransfer ? 'Edit Transfer Details' : 'New Transfer Details'}</DialogTitle>
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={3}>

                                <Grid item xs={12} lg={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="category">Category</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="category"
                                            select
                                            placeholder="Enter Book Category"
                                            {...getFieldProps('category')}
                                            error={Boolean(touched.category && errors.category)}
                                            helperText={touched.category && errors.category}
                                        >
                                            <MenuItem key={1} value={"Adventure"}>
                                                {"Adventure"}
                                            </MenuItem>
                                            <MenuItem key={2} value={"Novel"}>
                                                {"Novel"}
                                            </MenuItem>
                                            <MenuItem key={3} value={"Short Stories"}>
                                                {"Short Stories"}
                                            </MenuItem>
                                            <MenuItem key={4} value={"Child Story"}>
                                                {"Child Story"}
                                            </MenuItem>
                                            <MenuItem key={5} value={"Educational"}>
                                                {"Educational"}
                                            </MenuItem>
                                            <MenuItem key={6} value={"Religious"}>
                                                {"Religious"}
                                            </MenuItem>
                                            <MenuItem key={7} value={"Astrology"}>
                                                {"Astrology"}
                                            </MenuItem>
                                        </TextField>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="bookId">
                                            Book Name <span style={{ color: 'red' }}>*</span>
                                        </InputLabel>
                                        <Autocomplete
                                            fullWidth
                                            id="bookId"
                                            value={bookList?.find((option) => option._id === formik.values.bookId) || null}
                                            onChange={(event: any, newValue: Books | null) => {
                                                formik.setFieldValue('bookId', newValue?._id);
                                            }}
                                            options={bookList || []}
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
                                        <InputLabel htmlFor="userId">
                                            Borrow Person<span style={{ color: 'red' }}>*</span>
                                        </InputLabel>
                                        <Autocomplete
                                            fullWidth
                                            id="userId"
                                            value={usersFdd?.find((option) => option._id === formik.values.userId) || null}
                                            onChange={(event: any, newValue: Users | null) => {
                                                formik.setFieldValue('userId', newValue?._id);
                                            }}
                                            options={usersFdd || []}
                                            getOptionLabel={(item) => `${item.name}`}
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select User"
                                                        sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                                                    />
                                                )
                                            }}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <Divider />
                        <DialogActions sx={{ p: 2.5 }}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>

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
        </>
    );
};

export default AddEditTransferBook;
