import {
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Avatar,
    Divider,
    Box
} from '@mui/material';
import { useEffect } from 'react';
import { dispatch, useSelector } from 'store';
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import { getUserById } from 'store/reducers/users';

const TabProfile = () => {

    const { user } = useAuth();
    const { userGetById } = useSelector((state) => state.users);

    // Default Branch Set API
    useEffect(() => {
        if (typeof user?.id === 'undefined') return;
        dispatch(getUserById(user?.id!));
    }, [user?.id]);

    return (
        <Grid container justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={12} lg={8}>
                <MainCard>
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
        </Grid>
    );
};

export default TabProfile;
