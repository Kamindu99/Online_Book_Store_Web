
// material-ui
import { FormLabel, Grid, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import { facebookColor, linkedInColor, twitterColor } from 'config';

// assets
import { FacebookFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons';

// types
import { UserGetById } from 'types/users';

// ==============================|| USER PROFILE - TAB CONTENT ||============================== //

interface Props {
    userGetById: UserGetById;
}

const ProfileTabsMobile = ({ userGetById }: Props) => {


    return (
        <MainCard>
            <Grid container spacing={4}>
                <Grid item xs={12}>

                    <Stack spacing={2.5} alignItems="center" direction="row">
                        <FormLabel
                            htmlFor="change-avtar"
                            sx={{
                                position: 'relative',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                '&:hover .MuiBox-root': { opacity: 1 },
                                cursor: 'pointer'
                            }}
                        >
                            <Avatar alt="Avatar 1" src={userGetById?.profileImage} sx={{ width: 80, height: 80, border: '1px solid' }} />
                        </FormLabel>
                        <Stack spacing={0.5} alignItems="center">
                            <Typography variant="h5">{`${userGetById?.firstName} ${userGetById?.lastName}`}</Typography>
                            <Typography color="secondary">{userGetById?.occupation}</Typography>

                            <Stack direction="row" spacing={3} sx={{ '& svg': { fontSize: '1.15rem', cursor: 'pointer' } }}>
                                <TwitterSquareFilled style={{ color: twitterColor }} />
                                <FacebookFilled style={{ color: facebookColor }} />
                                <LinkedinFilled style={{ color: linkedInColor }} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={12}>
                    <Stack direction="row">
                        <Stack spacing={0.5} >
                            <Typography variant="h5">E-mail - <span style={{ color: "#818182", fontWeight: 'normal' }}>{userGetById?.email}</span></Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack spacing={0.5} >
                            <Typography variant="h5">Registed Date - <span style={{ color: "#818182", fontWeight: 'normal' }}>{userGetById?.createdDate?.slice(0, 10)}</span></Typography>
                        </Stack>
                    </Stack>
                    <Stack direction="row">
                        <Stack spacing={0.5} >
                            <Typography variant="h5">Status - <span style={{ color: "#818182", fontWeight: 'normal' }}>{userGetById?.isActive ? 'Active' : 'Inactive'}</span></Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default ProfileTabsMobile;
