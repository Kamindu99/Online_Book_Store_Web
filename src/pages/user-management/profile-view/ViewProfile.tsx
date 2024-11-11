import {
    MehOutlined,
    DeliveredProcedureOutlined,
    MoneyCollectOutlined,
    CheckSquareOutlined
} from '@ant-design/icons';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    Divider,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useTheme
} from '@mui/material';
import { PopupTransition } from 'components/@extended/Transitions';
import ReportCard from 'components/cards/statistics/ReportCard';
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import { dispatch, useSelector } from 'store';
import { getUserById } from 'store/reducers/users';
import MembershipCard from './member-card';

const TabProfile = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const { userGetById } = useSelector((state) => state.users);

    // Default Branch Set API
    useEffect(() => {
        if (typeof user?.id === 'undefined') return;
        dispatch(getUserById(user?.id!));
    }, [user?.id]);

    const [add, setAdd] = useState<boolean>(false);

    const handleAdd = () => {
        setAdd(!add);
    };

    return (
        <Grid container justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={12} lg={8}>
                <MainCard>
                    <Box display="flex" justifyContent="flex-end" mb={2} sx={{ height: '0px' }}>
                        <Button onClick={handleAdd} variant="contained" color="primary" sx={{ padding: '10px' }}>
                            Member Card
                        </Button>
                    </Box>

                    <Grid container spacing={3} mt={2} mb={2}>
                        <Grid item xs={12} lg={3} sm={6}>
                            <ReportCard primary="1 Books" secondary="Return Due" color={theme.palette.secondary.main} iconPrimary={MehOutlined} />
                        </Grid>
                        <Grid item xs={12} lg={3} sm={6}>
                            <ReportCard primary="3 Books" secondary="Borrow Books" color={theme.palette.secondary.main} iconPrimary={DeliveredProcedureOutlined} />
                        </Grid>
                        <Grid item xs={12} lg={3} sm={6}>
                            <ReportCard primary="2 Books" secondary="All Reads" color={theme.palette.success.dark} iconPrimary={CheckSquareOutlined} />
                        </Grid>
                        <Grid item xs={12} lg={3} sm={6}>
                            <ReportCard primary="Rs.200.00" secondary="Penalties" color={theme.palette.primary.main} iconPrimary={MoneyCollectOutlined} />
                        </Grid>
                    </Grid>

                    <Box display="flex" justifyContent="center" mb={3}>
                        <Avatar
                            src={userGetById?.profileImage}
                            alt="Profile"
                            sx={{ width: 150, height: 150, border: '4px solid', borderColor: 'primary.main' }}
                        />
                    </Box>
                    <Typography variant="h4" align="center" gutterBottom>
                        {userGetById?.firstName} {userGetById?.lastName}
                    </Typography>

                    <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                        {userGetById?.occupation}
                    </Typography>

                    <Divider sx={{ my: 3 }} />

                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="firstName-global">First Name</InputLabel>
                                <OutlinedInput
                                    disabled
                                    id="firstName-global"
                                    type="text"
                                    value={userGetById?.firstName}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="lastName-global">Last Name</InputLabel>
                                <OutlinedInput
                                    disabled
                                    id="lastName-global"
                                    type="text"
                                    value={userGetById?.lastName}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="email-global">Email Address</InputLabel>
                                <OutlinedInput
                                    disabled
                                    id="email-global"
                                    type="email"
                                    value={userGetById?.email}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack spacing={1}>
                                <InputLabel htmlFor="userStatus-global">User Status</InputLabel>
                                <OutlinedInput
                                    disabled
                                    id="userStatus-global"
                                    type="text"
                                    value={userGetById?.isActive ? 'Active' : 'Inactive'}
                                    fullWidth
                                />
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Typography align="center" color="textSecondary" variant="body2">
                        {`Last Updated: ${new Date().toLocaleDateString()}`}
                    </Typography>
                </MainCard>
            </Grid>
            {add &&
                <Dialog
                    maxWidth="sm"
                    TransitionComponent={PopupTransition}
                    keepMounted
                    fullWidth
                    onClose={handleAdd}
                    open={add}
                    sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <MembershipCard userGetById={userGetById!} onCancel={handleAdd} />
                </Dialog>
            }
        </Grid>
    );
};

export default TabProfile;
