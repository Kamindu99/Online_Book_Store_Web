import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, Grid,
    InputLabel,
    Stack,
    TextField,

} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';

//types 
import MainCard from "components/MainCard";
import { FormikValues } from 'formik';

// constant
const user = {
    id: undefined
}

const getInitialValues = (user: FormikValues | null) => {

    const newUser = {
        id: undefined,
        rolenames: undefined,
        modulenames: undefined,
    }

    if (user) {
        return _.merge({}, newUser, user);
    }

    return newUser;
};
// ==============================|| CreateEditView ||============================== //

const CreateEditView = () => {
    const { actionType, userId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        console.log(userId);
        console.log(actionType);
    }, [userId, actionType])

    const userRoleCreateEditSchema = Yup.object().shape({
        rolenames: Yup.string().required('User Role Name is required'),
        modulenames: Yup.string().required('User Role Description is required')
    });

    const formik = useFormik({
        initialValues: getInitialValues(user!),
        validationSchema: userRoleCreateEditSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            console.log("here-submit", values);

            try {
                if (user?.id) {
                    // PUT API Call 
                } else {
                    // POST API Call  
                }
                resetForm()
                setSubmitting(false);
            } catch (error) {
                console.error(error);
            }
        }
    });
    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

    return (
        <>
            <MainCard content={false}>
                <FormikProvider value={formik}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            <DialogTitle>
                                {actionType === 'create'
                                    ? 'Create '
                                    : userId && actionType === 'edit'
                                        ? 'Edit '
                                            : ''}
                                User Role Creation
                            </DialogTitle>
                            <Divider />
                            <DialogContent sx={{ p: 2.5 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} md={6}>
                                        <Grid container spacing={3}>

                                            <Grid item xs={12}>
                                                <Stack spacing={1.25}>
                                                    <InputLabel htmlFor="rolenames">User Role Name</InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        id="rolenames"
                                                        placeholder="Enter User Role Name"
                                                        {...getFieldProps('rolenames')}
                                                        error={Boolean(touched.rolenames && errors.rolenames)}
                                                        helperText={touched.rolenames && errors.rolenames}
                                                    />
                                                </Stack>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Stack spacing={1.25}>
                                                    <InputLabel htmlFor="modulenames">User Role Description</InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        id="modulenames"
                                                        placeholder="Enter User Role Description"
                                                        {...getFieldProps('modulenames')}
                                                        error={Boolean(touched.modulenames && errors.modulenames)}
                                                        helperText={touched.modulenames && errors.modulenames}
                                                    />
                                                </Stack>
                                            </Grid>
                                        </Grid>
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
                                            {actionType === 'create'
                                                ? <>
                                                    <Button color="error" onClick={() => { navigate(`/hr/user-management/role-creation`) }}>
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                                                        Create
                                                    </Button>
                                                </>
                                                : userId && actionType === 'edit'
                                                    ? <>
                                                        <Button color="error" onClick={() => { navigate(`/hr/user-management/role-creation`) }}>
                                                            Cancel
                                                        </Button>
                                                        <Button type="submit" variant="contained" disabled={isSubmitting}>
                                                            Edit
                                                        </Button>
                                                    </>
                                                        : <>
                                                            <Button color="error" onClick={() => { navigate(`/hr/user-management/role-creation`) }}>
                                                                Cancel
                                                            </Button>
                                                        </>}
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </DialogActions>
                        </Form>
                    </LocalizationProvider>
                </FormikProvider>
            </MainCard>
        </>
    )
}


export default CreateEditView;