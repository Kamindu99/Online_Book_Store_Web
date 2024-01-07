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
const agent = {
    id: undefined
}

const agentData = {
    firstName: "Claudia",
    nic: "934254765V",
    date: "2023-09-18",
    country: "Rwanda",
    address: "1412 Ogivuh River, Adufikgo, Belarus - 53340",
    email: "ga@gmail.com",
    contact: "(278) 823-2159",
    status: "Hold",
}

const getInitialValues = (agent: FormikValues | null) => {

    const newAgent = {
        id: undefined,
        firstName: '',
        nic: '',
        date: '',
        country: '',
        address: '',
        email: '',
        contact: '',
        status: '',
    }

    if (agent) {
        return _.merge({}, newAgent, agent);
    }

    return newAgent;
};


// ==============================|| CreateEditView ||============================== //

const CreateEditView = () => {
    const { actionType, agentId } = useParams()
    const navigate = useNavigate()
    const theme = useTheme();

    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        console.log(agentId);
        console.log(actionType);
    }, [agentId, actionType])

    const agentCreateEditSchema = Yup.object().shape({
        firstName: Yup.string().required('Agent Name is required'),
        nic: Yup.string().required('NIC Number is required'),
        date: Yup.string().required('Date of Birth is required'),
        country: Yup.string().required('Location is required'),
        address: Yup.string().required('Address is required'),
        email: Yup.string().required('E-mail Address is required'),
        contact: Yup.string().required("Contact Number is required")
    });

    const formik = useFormik({
        initialValues: getInitialValues(agent!),
        validationSchema: agentCreateEditSchema,
        enableReinitialize: true,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            console.log("here-submit", values);
            try {
                if (agent?.id) {
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
                                    : agentId && actionType === 'view'
                                        ? 'View '
                                        : ''}
                                Agent
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
                                                                    <InputLabel htmlFor="firstName">Agent Name</InputLabel>
                                                                    <TextField
                                                                        fullWidth
                                                                        id="firstName"
                                                                        placeholder="Enter Agent Name"
                                                                        {...getFieldProps('firstName')}
                                                                        error={Boolean(touched.firstName && errors.firstName)}
                                                                        helperText={touched.firstName && errors.firstName}
                                                                    />

                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <Grid item xs={12}>
                                                                        <Stack spacing={1.25}>
                                                                            <InputLabel htmlFor="nic">NIC Number</InputLabel>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="nic"
                                                                                placeholder="Enter NIC Number"
                                                                                {...getFieldProps('nic')}
                                                                                error={Boolean(touched.nic && errors.nic)}
                                                                                helperText={touched.nic && errors.nic}
                                                                            />

                                                                        </Stack>
                                                                    </Grid>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <InputLabel htmlFor="addresss">Address</InputLabel>
                                                                    <TextField
                                                                        fullWidth
                                                                        id="addresss"
                                                                        placeholder="Enter Address"
                                                                        {...getFieldProps('addresss')}
                                                                        error={Boolean(touched.address && errors.address)}
                                                                        helperText={touched.address && errors.address}
                                                                    />

                                                                </Stack>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <InputLabel htmlFor="email">E mail Address</InputLabel>
                                                                    <TextField
                                                                        fullWidth
                                                                        id="email"
                                                                        placeholder="Enter E mail Address"
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
                                                                    <InputLabel htmlFor="date">Date of Birth</InputLabel>
                                                                    <TextField
                                                                        id="date"
                                                                        placeholder="Date of Birth"
                                                                        type="date"
                                                                        InputLabelProps={{
                                                                            shrink: true
                                                                        }}
                                                                        {...getFieldProps('date')}
                                                                        error={Boolean(touched.date && errors.date)}
                                                                        helperText={touched.date && errors.date}
                                                                    />

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
                                                            <Grid item xs={12}>
                                                                <Stack spacing={1.25}>
                                                                    <Grid item xs={12}>
                                                                        <Stack spacing={1.25}>
                                                                            <InputLabel htmlFor="country">Location</InputLabel>
                                                                            <TextField
                                                                                fullWidth
                                                                                id="country"
                                                                                placeholder="Enter Location"
                                                                                {...getFieldProps('country')}
                                                                                error={Boolean(touched.country && errors.country)}
                                                                                helperText={touched.country && errors.country}
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
                                    : agentId && actionType === 'view'
                                        ? <>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={12}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12}>
                                                            <Stack>
                                                                <List sx={{ py: 0 }}>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid item xs={12} md={12}>
                                                                            <Stack spacing={0.5}>
                                                                                <Typography color="secondary">Agent Name</Typography>
                                                                                <Typography>
                                                                                    {agentData.firstName}
                                                                                </Typography>
                                                                            </Stack>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">NIC</Typography>
                                                                                    <Typography>
                                                                                        {agentData.nic}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">DOB</Typography>
                                                                                    <Typography>
                                                                                        {agentData.date}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Location</Typography>
                                                                                    <Typography>
                                                                                        {agentData.country}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Contact No</Typography>
                                                                                    <Typography>
                                                                                        {agentData.contact}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Email Address</Typography>
                                                                                    <Typography>
                                                                                        {agentData.email}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Address</Typography>
                                                                                    <Typography>
                                                                                        {agentData.address}
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
                                                                        <Grid item xs={12} md={12}>
                                                                            <Stack spacing={0.5}>
                                                                                <Typography color="secondary">Agent Name</Typography>
                                                                                <Typography>
                                                                                    {agentData.firstName}
                                                                                </Typography>
                                                                            </Stack>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">NIC</Typography>
                                                                                    <Typography>
                                                                                        {agentData.nic}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">DOB</Typography>
                                                                                    <Typography>
                                                                                        {agentData.date}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={12}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Location</Typography>
                                                                                    <Typography>
                                                                                        {agentData.country}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Contact No</Typography>
                                                                                    <Typography>
                                                                                        {agentData.contact}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Email Address</Typography>
                                                                                    <Typography>
                                                                                        {agentData.email}
                                                                                    </Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItem>
                                                                    <ListItem divider={!matchDownMD}>
                                                                        <Grid container spacing={3}>
                                                                            <Grid item xs={12} md={6}>
                                                                                <Stack spacing={0.5}>
                                                                                    <Typography color="secondary">Address</Typography>
                                                                                    <Typography>
                                                                                        {agentData.address}
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
                                                    <Button color="error" onClick={() => { navigate(`/application/agent-management/agents`) }}>
                                                        Cancel
                                                    </Button>
                                                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                                                        Create
                                                    </Button>
                                                </>
                                                : agentId && actionType === 'view'
                                                    ? <>
                                                        <Button color="error" onClick={() => { navigate(`/application/agent-management/agents`) }}>
                                                            Cancel
                                                        </Button>
                                                    </>
                                                    : <>
                                                        <Button color="error" onClick={() => { navigate(`/application/agent-management/agents`) }}>
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