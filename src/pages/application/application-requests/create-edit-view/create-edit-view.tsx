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
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import _ from 'lodash';

//types 
import MainCard from "components/MainCard";
import { FormikValues } from 'formik';

// constant
const user = {
    id: undefined
}

const applicationRequestData = {
    date: "2023-09-18",
    agent: "Justin",
    subagent: "Brewer",
    location: "Ascension Island",
    policytype: "Motor",
    product: "Fire",
    requeststatus: "Policy Issued",
    status: "Hold",
}

const getInitialValues = (user: FormikValues | null) => {

    const newUser = {
        id: undefined,
        date: '',
        agent: '',
        subagent: '',
        location: '',
        policytype: '',
        product: '',
        requeststatus: '',
        status: ''
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
    const theme = useTheme();

    const matchDownMD = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
        console.log(userId);
        console.log(actionType);
    }, [userId, actionType])

    const formik = useFormik({
        initialValues: getInitialValues(user!),
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

    return (
        <>
            <MainCard content={false}>
                <FormikProvider value={formik}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Form autoComplete="off" noValidate>
                            <DialogTitle>
                                {userId && actionType === 'view'
                                            ? 'View '
                                            : ''}
                                Application Request
                            </DialogTitle>
                            <Divider />
                            <DialogContent sx={{ p: 2.5 }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Stack>
                                                <List sx={{ py: 0 }}>
                                                <ListItem divider={!matchDownMD}>
                                                            <Grid item xs={12} md={12}>
                                                                <Stack spacing={0.5}>
                                                                    <Typography color="secondary">Date / Time</Typography>
                                                                    <Typography>
                                                                        {applicationRequestData.date}
                                                                    </Typography>
                                                                </Stack>
                                                            </Grid>
                                                    </ListItem>
                                                    <ListItem divider={!matchDownMD}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} md={12}>
                                                                <Stack spacing={0.5}>
                                                                    <Typography color="secondary">Agent Name</Typography>
                                                                    <Typography>
                                                                        {applicationRequestData.agent}
                                                                    </Typography>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                    <ListItem divider={!matchDownMD}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} md={12}>
                                                                <Stack spacing={0.5}>
                                                                    <Typography color="secondary">Sub Agent Name</Typography>
                                                                    <Typography>
                                                                        {applicationRequestData.subagent}
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
                                                                        {applicationRequestData.location}
                                                                    </Typography>
                                                                </Stack>
                                                            </Grid>
                                                        </Grid>
                                                    </ListItem>
                                                    <ListItem divider={!matchDownMD}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} md={6}>
                                                                <Stack spacing={0.5}>
                                                                    <Typography color="secondary">Policy Type</Typography>
                                                                    <Typography>
                                                                        {applicationRequestData.policytype}
                                                                    </Typography>
                                                                </Stack>
                                                            </Grid>
                                                            <Grid item xs={12} md={6}>
                                                                <Stack spacing={0.5}>
                                                                    <Typography color="secondary">Product</Typography>
                                                                    <Typography>
                                                                        {applicationRequestData.product}
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
                            </DialogContent>
                            <Divider />
                            <DialogActions sx={{ p: 2.5 }}>
                                <Grid container justifyContent="space-between" alignItems="center">
                                    <Grid item>
                                    </Grid>
                                    <Grid item>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            {userId && actionType === 'view'
                                                        ? <>
                                                            <Button color="error" onClick={() => { navigate(`/application/application-requests`) }}>
                                                                Cancel
                                                            </Button>
                                                        </>
                                                        : <>
                                                            <Button color="error" onClick={() => { navigate(`/application/application-requests`) }}>
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