
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
    TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

// project imports
import { dispatch } from 'store';

// assets
import { toInitialState } from 'store/reducers/book-master';
import { createCategoryCode, updateCategoryCode } from 'store/reducers/category-code';
import { CategoryCodeDTO } from 'types/category-code';

// types

// constant
const getInitialValues = (categoryCode: FormikValues | null) => {

    const newCategoryCode = {
        _id: '',
        categoryCode: '',
        categoryName: '',
        createdDate: '',
        isActive: true
    };

    if (categoryCode) {
        return _.merge({}, newCategoryCode, categoryCode);
    }

    return newCategoryCode;
};

// ==============================|| Category ADD / EDIT ||============================== //

export interface Props {
    categoryCode?: CategoryCodeDTO;
    onCancel: () => void;
}

const AddEditCategoryCode = ({ categoryCode, onCancel }: Props) => {

    const CategoryCodeSchema = Yup.object().shape({
        categoryCode: Yup.string().max(255).required('Category Code is required'),
        categoryName: Yup.string().max(255).required('Category Name is required'),
    });

    const formik = useFormik({
        initialValues: getInitialValues(categoryCode!),
        validationSchema: CategoryCodeSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (categoryCode) {
                    dispatch(updateCategoryCode(values));
                } else {
                    dispatch(createCategoryCode({
                        categoryCode: values.categoryCode,
                        categoryName: values.categoryName
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

    return (
        <>
            <FormikProvider value={formik}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <DialogTitle>{categoryCode ? 'Edit Category Code' : 'New Category Code'}</DialogTitle>
                        <DialogContent sx={{ p: 2.5 }}>
                            <Grid container spacing={3}>

                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="categoryCode">Category Code</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="categoryCode"
                                            type='text'
                                            placeholder="Enter Category Code"
                                            {...getFieldProps('categoryCode')}
                                            error={Boolean(touched.categoryCode && errors.categoryCode)}
                                            helperText={touched.categoryCode && errors.categoryCode}
                                        />
                                    </Stack>
                                </Grid>


                                <Grid item xs={12} md={6}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="categoryName">Category Name</InputLabel>
                                        <TextField
                                            fullWidth
                                            id="categoryName"
                                            type='text'
                                            placeholder="Enter Category Name"
                                            {...getFieldProps('categoryName')}
                                            error={Boolean(touched.categoryName && errors.categoryName)}
                                            helperText={touched.categoryName && errors.categoryName}
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
                                            {categoryCode ? 'Edit' : 'Add'}
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

export default AddEditCategoryCode;
