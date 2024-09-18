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
import { getDefaultBranchUserById } from 'store/reducers/user';

const TabProfile = ({ isDemo = false }: { isDemo?: boolean }) => {

    const { user } = useAuth();
    const { userDefaultBranchById } = useSelector((state) => state.user);

    // Default Branch Set API
    useEffect(() => {
        if (typeof user?.id === 'undefined') return;
        dispatch(getDefaultBranchUserById(user?.id!));
    }, [user?.id]);

    return (
        <Grid container justifyContent="center" alignItems="center" xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <MainCard>
                    <Box display="flex" justifyContent="center" mb={3}>
                        <Avatar
                            src={userDefaultBranchById?.profileImage}
                            alt="Profile"
                            sx={{ width: 150, height: 150, border: '5px solid', borderColor: 'primary.main' }}
                        />
                    </Box>

                    <Typography variant="h4" align="center" gutterBottom>
                        {userDefaultBranchById?.firstName} {userDefaultBranchById?.lastName}
                    </Typography>

                    <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
                        {userDefaultBranchById?.occupation}
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
                                    value={userDefaultBranchById?.firstName}
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
                                    value={userDefaultBranchById?.lastName}
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
                                    value={userDefaultBranchById?.email}
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
                                    value={userDefaultBranchById?.isActive ? 'Active' : 'Inactive'}
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
