import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

// material-ui
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider, Grid,
    List,
    ListItem,
    Stack,
    Typography,
    useMediaQuery,
    InputLabel,
    TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
const agentLocation = {
    id: undefined
}

const agentLocationData = {
    locationcode: 'Loc1',
    locationname: 'Colombo',
    locationdesc: 'Magestic City',
    province: 'Western',
    desctrict: 'Colombo',
    address: '350 Ormaw Path, Edaedzow, Monaco - 37612',
    email: 'udoha@gmail.com',
    contact: '(963) 802-7110',
    status: 'Pending',
}

const getInitialValues = (agentLocation: FormikValues | null) => {

    const newAgentLocation = {
        locationcode: undefined,
        locationname: '',
        locationdesc: '',
        province: '',
        desctrict: '',
        address: '',
        email: '',
        contact: '',
        status: '',
    }

    if (agentLocation) {
        return _.merge({}, newAgentLocation, agentLocation);
    }

    return newAgentLocation;
};


// ==============================|| CreateEditView ||============================== //

const CreateEditView = () => {
    const { actionType, agentLocationId } = useParams()
    const navigate = useNavigate()
    const theme = useTheme();

    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        console.log(agentLocationId);
        console.log(actionType);
    }, [agentLocationId, actionType])

    const agentLocationCreateEditSchema = Yup.object().shape({
        locationcode: Yup.string().required('Location Code is required'),
        locationname: Yup.string().required('Location Name is required'),
        locationdesc: Yup.string().required('Description is required'),
        province: Yup.string().required('Province is required'),
        desctrict: Yup.string().required('Desctrict is required'),
        address: Yup.string().required('Address is required'),
        email: Yup.string().required('E-mail Address is required'),
        contact: Yup.string().required("Contact Number is required")
    });

    const formik = useFormik({
        initialValues: getInitialValues(agentLocation!),
        validationSchema: agentLocationCreateEditSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            console.log("here-submit", values);
            try {
                if (agentLocation?.id) {
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
                                    : agentLocationId && actionType === 'view'
                                        ? 'View '
                                        : ''}
                                Agent | Sub Agent Location
                            </DialogTitle>
                            <Divider />
                            <DialogContent sx={{ p: 2.5 }}>
                                {actionType === 'create'
                                    ? <>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} md={12}>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6} md={6}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <InputLabel htmlFor="locationcode">Location Code</InputLabel>
                                                                    <TextField
                                                                        fullWidth
                                                                        id="locationcode"
                                                                        placeholder="Enter Location Code"
                                                                        {...getFieldProps('locationcode')}
                                                                        error={Boolean(touched.locationcode && errors.locationcode)}
                                                                        helperText={touched.locationcode && errors.locationcode}
                                                                    />

                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <Grid item xs={12}>
                                                                        <Stack spacing={1.25}>
                                                                            <InputLabel htmlFor="locationdesc">Description</InputLabel>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="locationdesc"
                                                                                placeholder="Enter Description"
                                                                                {...getFieldProps('locationdesc')}
                                                                                error={Boolean(touched.locationdesc && errors.locationdesc)}
                                                                                helperText={touched.locationdesc && errors.locationdesc}
                                                                            />

                                                                        </Stack>
                                                                        {/* <Stack spacing={1.25}>
                                                                            <InputLabel htmlFor="locationname">Location Name</InputLabel>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="locationname"
                                                                                placeholder="Enter Location Name"
                                                                                {...getFieldProps('locationname')}
                                                                                error={Boolean(touched.locationname && errors.locationname)}
                                                                                helperText={touched.locationname && errors.locationname}
                                                                            />

                                                                        </Stack> */}
                                                                    </Grid>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <InputLabel htmlFor="province">Province</InputLabel>
                                                                    <TextField
                                                                        fullWidth
                                                                        id="province"
                                                                        placeholder="Enter Province"
                                                                        {...getFieldProps('province')}
                                                                        error={Boolean(touched.province && errors.province)}
                                                                        helperText={touched.province && errors.province}
                                                                    />


                                                                </Stack>
                                                                {/* <Stack spacing={1.25}>
                                                                    <InputLabel htmlFor="locationdesc">Description</InputLabel>
                                                                    <TextField
                                                                        fullWidth
                                                                        id="locationdesc"
                                                                        placeholder="Enter Description"
                                                                        {...getFieldProps('locationdesc')}
                                                                        error={Boolean(touched.locationdesc && errors.locationdesc)}
                                                                        helperText={touched.locationdesc && errors.locationdesc}
                                                                    />

                                                                </Stack> */}
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                {/* <Stack spacing={1.25}>
                                                                    <InputLabel htmlFor="province">Province</InputLabel>
                                                                    <TextField
                                                                        fullWidth
                                                                        id="province"
                                                                        placeholder="Enter Province"
                                                                        {...getFieldProps('province')}
                                                                        error={Boolean(touched.province && errors.province)}
                                                                        helperText={touched.province && errors.province}
                                                                    />


                                                                </Stack> */}
                                                                <Stack spacing={1.25}>
                                                                    <InputLabel htmlFor="email">E mail Address</InputLabel>
                                                                    <TextField
                                                                        fullWidth
                                                                        id="email"
                                                                        placeholder="Enter E-mail Address"
                                                                        {...getFieldProps('email')}
                                                                        error={Boolean(touched.email && errors.email)}
                                                                        helperText={touched.email && errors.email}
                                                                    />
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={6} md={6}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <Grid item xs={12}>

                                                                        <Stack spacing={1.25}>
                                                                            <InputLabel htmlFor="locationname">Location Name</InputLabel>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="locationname"
                                                                                placeholder="Enter Location Name"
                                                                                {...getFieldProps('locationname')}
                                                                                error={Boolean(touched.locationname && errors.locationname)}
                                                                                helperText={touched.locationname && errors.locationname}
                                                                            />

                                                                        </Stack>
                                                                    </Grid>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <Grid item xs={12}>
                                                                        <Stack spacing={1.25}>
                                                                            <InputLabel htmlFor="address">Address</InputLabel>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="address"
                                                                                placeholder="Enter Address"
                                                                                {...getFieldProps('address')}
                                                                                error={Boolean(touched.address && errors.address)}
                                                                                helperText={touched.address && errors.address}
                                                                            />

                                                                        </Stack>

                                                                    </Grid>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <Grid item xs={12}>
                                                                        <Stack spacing={1.25}>
                                                                            <InputLabel htmlFor="desctrict">District</InputLabel>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="desctrict"
                                                                                placeholder="Enter District"
                                                                                {...getFieldProps('desctrict')}
                                                                                error={Boolean(touched.desctrict && errors.desctrict)}
                                                                                helperText={touched.desctrict && errors.desctrict}
                                                                            />
                                                                        </Stack>
                                                                    </Grid>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <Grid item xs={12}>
                                                                        <Stack spacing={1.25}>
                                                                            <InputLabel htmlFor="contact">Contact Number</InputLabel>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="contact"
                                                                                placeholder="Enter Contact Number"
                                                                                {...getFieldProps('contact')}
                                                                                error={Boolean(touched.contact && errors.contact)}
                                                                                helperText={touched.contact && errors.contact}
                                                                            />

                                                                        </Stack>
                                                                    </Grid>
                                                                </Stack>
                                                            </Grid>


                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </>
                                    : agentLocationId && actionType === 'view'
                                        ? <>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Stack>
                                                                <List sx={{ py: 0 }}>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid item xs={12} md={6}>
                                                                            <Stack spacing={0.5}>
                                                                                <Typography color="secondary">Location Code</Typography>
                                                                                <Typography>
                                                                                    {agentLocationData.locationcode}
                                                                                </Typography>
                                                                            </Stack>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <Stack spacing={0.5}>
                                                                                <Typography color="secondary">Location Name</Typography>
                                                                                <Typography>
                                                                                    {agentLocationData.locationname}
                                                                                </Typography>
                                                                            </Stack>
                                                                        </Grid>
                                                                    </ListItem>

                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Description</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.locationdesc}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Address</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.address}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Province</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.province}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">District</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.desctrict}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Email Address</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.email}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Contact Number</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.contact}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                        </Grid>
                                                                    </ListItem>


                                                                </List>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </>
                                        : <>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Stack>
                                                                <List sx={{ py: 0 }}>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid item xs={12} md={6}>
                                                                            <Stack spacing={0.5}>
                                                                                <Typography color="secondary">Location Code</Typography>
                                                                                <Typography>
                                                                                    {agentLocationData.locationcode}
                                                                                </Typography>
                                                                            </Stack>
                                                                        </Grid>
                                                                        <Grid item xs={12} md={6}>
                                                                            <Stack spacing={0.5}>
                                                                                <Typography color="secondary">Location Name</Typography>
                                                                                <Typography>
                                                                                    {agentLocationData.locationname}
                                                                                </Typography>
                                                                            </Stack>
                                                                        </Grid>
                                                                    </ListItem>

                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Description</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.locationdesc}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Address</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.address}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Province</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.province}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">District</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.desctrict}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Email Address</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.email}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Contact Number</Typography>
                                                                                    <Typography>
                                                                                        {agentLocationData.contact}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>

                                                                        </Grid>
                                                                    </ListItem>


                                                                </List>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                        </>}
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
                                                    <Button color="error" onClick={() => { navigate(`/parameter/agent-sub-agent-location`) }}>
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                                                        Create
                                                    </Button>
                                                </>
                                                : agentLocationId && actionType === 'view'
                                                    ? <>
                                                        <Button color="error" onClick={() => { navigate(`/parameter/agent-sub-agent-location`) }}>
                                                            Cancel
                                                        </Button>
                                                    </>
                                                    : <>
                                                        <Button color="error" onClick={() => { navigate(`/parameter/agent-sub-agent-location`) }}>
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