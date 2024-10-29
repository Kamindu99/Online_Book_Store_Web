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
import { updateBookorder } from 'store/reducers/book-order';
import { getCateogyCodesFdd } from 'store/reducers/category-code';
import { getUsersFdd } from 'store/reducers/users';
import { Books } from 'types/book-master';
import { Users } from 'types/users';

// types

// constant
const getInitialValues = (booktransfer: FormikValues | null) => {

    const newBooktransfer = {
        _id: '',
        bookId: '',
        transferedate: new Date().toISOString().split('T')[0],
        userId: '',
        categoryId: ''
    };

    if (booktransfer) {
        return _.merge({}, newBooktransfer, {
            ...booktransfer,
            categoryId: booktransfer.bmBook?.categoryId
        });
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
                dispatch(updateBookorder({
                    _id: values._id,
                    approverComment: 'Book Borrowed',
                    status: 'Borrowed'
                }))
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
    const { categoryCodeFdd } = useSelector(state => state.categoryCode)

    useEffect(() => {
        if (formik.values.categoryId === '') {
            setBookList([])
            return
        };
        dispatch(getBooksFdd(formik.values.categoryId));
    }, [formik.values.categoryId])

    const { usersFdd } = useSelector(state => state.users)

    useEffect(() => {
        dispatch(getUsersFdd());
        dispatch(getCateogyCodesFdd());
    }, [])

    const [bookList, setBookList] = useState<Books[]>([]);

    useEffect(() => {
        if (booktransfer && booksFdd) {
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
                        <DialogTitle>{booktransfer ? 'Book Borrow Details' : 'New Borrow Details'}</DialogTitle>
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={3}>

                                <Grid item xs={12} lg={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="categoryId">Category</InputLabel>
                                        <Autocomplete
                                            fullWidth
                                            disabled
                                            id="categoryId"
                                            value={categoryCodeFdd?.find((option) => option._id === formik.values.categoryId) || null}
                                            onChange={(event: any, newValue: Books | null) => {
                                                formik.setFieldValue('categoryId', newValue?._id);
                                            }}
                                            options={categoryCodeFdd || []}
                                            getOptionLabel={(item) => `${item.categoryName}`}
                                            renderInput={(params) => {
                                                return (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select Category"
                                                        sx={{ '& .MuiAutocomplete-input.Mui-disabled': { WebkitTextFillColor: theme.palette.text.primary } }}
                                                    />
                                                )
                                            }}
                                        />
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="bookId">
                                            Book Name <span style={{ color: 'red' }}>*</span>
                                        </InputLabel>
                                        <Autocomplete
                                            fullWidth
                                            disabled
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
                                            disabled
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
                                            {booktransfer ? 'Borrow' : 'Add'}
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
