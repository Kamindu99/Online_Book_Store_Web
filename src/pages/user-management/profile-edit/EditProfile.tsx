import {
    Box,
    Button,
    Divider,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MainCard from 'components/MainCard';
import AvatarUpload from 'components/third-party/dropzone/Avatar';
import { Form, FormikProvider, FormikValues, useFormik } from 'formik';
import useAuth from 'hooks/useAuth';
import _ from 'lodash';
import { useEffect } from 'react';
import { dispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { getUserById, updateUser } from 'store/reducers/users';
import { UserGetById } from 'types/users';

const getInitialValues = (userById: FormikValues | null) => {

    const newUser = {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        occupation: '',
        profileImage: '',
        imageUrl: '',
        isActive: false
    }

    if (userById) {
        return _.merge({}, newUser, {
            _id: userById._id,
            firstName: userById.firstName,
            lastName: userById.lastName,
            email: userById.email,
            occupation: userById.occupation,
            profileImage: userById.profileImage,
            imageUrl: userById.profileImage,
            isActive: userById.isActive
        });
    }

    return newUser;
};

const TabProfile = () => {
    const { user } = useAuth();
    const { userGetById } = useSelector((state) => state.users);
    // Load user data on mount
    useEffect(() => {
        if (typeof user?.id === 'undefined') return;
        dispatch(getUserById(user?.id!));
    }, [user?.id]);

    // Update local state when user data changes
    useEffect(() => {
        if (userGetById) {
            //@ts-ignore
            formik.setValues(userGetById!);
        }
    }, [userGetById]);

    const formik = useFormik({
        initialValues: getInitialValues(userGetById!),
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                let userRequestDto: UserGetById = {
                    _id: values._id,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    occupation: values.occupation,
                    profileImage: values.imageUrl
                }
                // PUT API
                await dispatch(updateUser(userRequestDto))
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Your profile has been updated successfully.',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    }));
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                resetForm()
                setSubmitting(false);
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue } = formik;

    return (
        <FormikProvider value={formik}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Grid container justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
                        <Grid item xs={12} sm={12} md={12} lg={8}>
                            <MainCard>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <AvatarUpload
                                        //@ts-ignore
                                        file={values.imageUrl!}
                                        sx={{ width: 150, height: 150, border: '2px dashed', borderColor: 'primary.main' }}
                                        setFieldValue={setFieldValue}
                                        error={touched.imageUrl && Boolean(errors.imageUrl)}
                                    />
                                </Box>
                                <Typography variant="h4" align="center" gutterBottom>
                                    {userGetById?.firstName} {userGetById?.lastName}
                                </Typography>
                                <Divider sx={{ my: 3 }} />
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="firstName-signup">First Name*</InputLabel>
                                            <OutlinedInput
                                                id="firstName-login"
                                                type="firstName"
                                                value={values.firstName}
                                                name="firstName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter First Name"
                                                fullWidth
                                                error={Boolean(touched.firstName && errors.firstName)}
                                            />
                                            {touched.firstName && errors.firstName && (
                                                <FormHelperText error id="helper-text-firstName-signup">
                                                    {errors.firstName}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="lastName-signup">Last Name*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.lastName && errors.lastName)}
                                                id="lastName-signup"
                                                type="lastName"
                                                value={values.lastName}
                                                name="lastName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter Last Name"
                                                inputProps={{}}
                                            />
                                            {touched.lastName && errors.lastName && (
                                                <FormHelperText error id="helper-text-lastName-signup">
                                                    {errors.lastName}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="occupation-signup">Occupation*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.occupation && errors.occupation)}
                                                id="occupation-signup"
                                                type="occupation"
                                                value={values.occupation}
                                                name="occupation"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter Occupation"
                                                inputProps={{}}
                                            />
                                            {touched.occupation && errors.occupation && (
                                                <FormHelperText error id="helper-text-occupation-signup">
                                                    {errors.occupation}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <InputLabel htmlFor="email-signup">Email Address*</InputLabel>
                                            <OutlinedInput
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                                id="email-login"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Enter Email Address"
                                                inputProps={{}}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="helper-text-email-signup">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                <Box display="flex" justifyContent="center">
                                    <Button variant="contained" color="primary" type='submit'>
                                        Update Changes
                                    </Button>
                                </Box>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Form>
            </LocalizationProvider>
        </FormikProvider>
    );
};

export default TabProfile;
