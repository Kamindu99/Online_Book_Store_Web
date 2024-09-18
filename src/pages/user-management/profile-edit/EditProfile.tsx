import {
    Button,
    Grid,
    InputLabel,
    Stack,
    TextField
} from '@mui/material';

// third party
import { FormikValues, useFormik } from 'formik';

// project import
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';
import { getDefaultBranchUserById, toInitialState, updateUserSuccess } from 'store/reducers/user';
import { UserDefaultBranch } from 'types/user';
import { UserRequestDto } from './types/types';


const getInitialValues = (userById: FormikValues | null) => {

    const newUser = {
        userId: undefined,
        userName: '',
        password: '',
        rePassword: '',
        description: '',
        userStatus: '',
        accountOptionLink: false,
        accountOptionManual: false,
        forceChangePassword: false,
        generateOnetimePassword: false,
        statusId: undefined,
        userRoleId: undefined,
        branchId: undefined,
        departmentId: undefined,
        email: '',
        mobileNumber: '',
        nic: '',
        designation: '',
        fullName: ''
    }

    if (userById) {
        return _.merge({}, newUser, userById);
    }

    return newUser;
};

export interface Props {
    userById?: UserDefaultBranch
}
export interface dataProps extends UserDefaultBranch { }

const TabProfile = ({ }: Props) => {

    const { user } = useAuth()
    const [data, setData] = useState<dataProps>()
    console.log(data);

    const dispatch = useDispatch();
    const { userDefaultBranchById, error, EditProfileSuccess } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getDefaultBranchUserById(user?.id!))
    }, [user])

    useEffect(() => {
        if (!userDefaultBranchById) {
            setData(undefined)
            return
        }
        if (userDefaultBranchById == null) {
            setData(undefined)
            return
        }
        setData(userDefaultBranchById)
    }, [userDefaultBranchById])

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
        if (EditProfileSuccess != null) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: EditProfileSuccess,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            dispatch(toInitialState());
        }
    }, [EditProfileSuccess])
    // ----------------------- | API Call - Edit Profile | ---------------------

    const formik = useFormik({
        initialValues: getInitialValues(userDefaultBranchById!),
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            try {
                if (userDefaultBranchById) {

                    let userRequestDto: UserRequestDto = {
                        userId: values?.userId,
                        userName: values?.userName,
                        password: values?.password,
                        rePassword: values?.rePassword,
                        description: values?.description,
                        userStatus: "A",
                        accountOptionLink: values?.accountOptionLink,
                        accountOptionManual: values?.accountOptionManual,
                        forceChangePassword: values?.forceChangePassword,
                        generateOnetimePassword: values?.generateOnetimePassword,
                        statusId: values?.statusId,
                        userRoleId: values?.userRoleId,
                        branchId: values?.branchId,
                        departmentId: values?.departmentId,
                        email: values?.email,
                        mobileNumber: values?.mobileNumber,
                        nic: values?.nic,
                        designation: values?.designation,
                        fullName: values?.fullName
                    }

                    // PUT API
                    dispatch(updateUserSuccess(userRequestDto))
                }
                resetForm()
                setSubmitting(false);
            } catch (error) {
                console.error(error);
            }
        }
    });

    const { getFieldProps, isSubmitting, handleSubmit } = formik;

    return (

        <Grid item xs={12} sm={6} spacing={2}>
            <MainCard title="Edit Profile Details">
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="nic">NIC</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="Enter NIC"
                                    id="nic"
                                    {...getFieldProps('nic')}
                                    disabled
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="fronturl-global">Mobile Number</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="Enter Mobile No"
                                    id="mobileNumber"
                                    {...getFieldProps('mobileNumber')}
                                    onChange={(event) => {
                                        formik.setFieldValue('mobileNumber', event.target.value);
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="fronturl-global">First Name</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="Enter First Name"
                                    id="fullName"
                                    disabled
                                    {...getFieldProps('fullName')}
                                    onChange={(event) => {
                                        formik.setFieldValue('fullName', event.target.value);
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="fronturl-global">Designation</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    placeholder="Enter Designation"
                                    id="designation"
                                    {...getFieldProps('designation')}
                                    onChange={(event) => {
                                        formik.setFieldValue('designation', event.target.value);
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="footertitle-global">Email Address</InputLabel>
                                <TextField
                                    fullWidth
                                    placeholder="Enter Email"
                                    id="email"
                                    {...getFieldProps('email')}
                                    onChange={(event) => {
                                        formik.setFieldValue('email', event.target.value);
                                    }}
                                />

                            </Stack>
                        </Grid>
                        <Grid item xs={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="domaindescription-global">User Name</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    placeholder="Enter User Name"
                                    id="userName"
                                    {...getFieldProps('userName')}
                                    onChange={(event) => {
                                        formik.setFieldValue('userName', event.target.value);
                                    }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: '20px' }}>
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Button type="submit" variant="contained" disabled={isSubmitting}>
                                    Update
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
                {/* <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: '20px' }}>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button type="submit" variant="contained" disabled={isSubmitting}>
                                Update
                            </Button>
                        </Stack>
                    </Grid>
                </Grid> */}
            </MainCard>
        </Grid>
    );
};

export default TabProfile;