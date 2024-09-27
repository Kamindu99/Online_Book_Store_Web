import { Avatar, Box, Button, DialogActions, DialogContent, DialogTitle, Divider, Grid, Stack, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import QrGenerator from 'components/third-party/GenerateQR';
import { useRef } from 'react';
import { UserGetById } from 'types/users';
import html2canvas from 'html2canvas';

const MembershipCard = ({ userGetById, onCancel }: { userGetById: UserGetById; onCancel: any }) => {
    const colors = {
        orange: {
            5: '#FFA500',
        },
        white: '#FFFFFF',
        blue: {
            6: '#2196F3',
        },
    };
    const componentRef = useRef<HTMLElement>(null);

    const handleDownload = () => {
        if (componentRef.current) {
            html2canvas(componentRef.current, {
                useCORS: true, // Enable CORS support for external images
            }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'membership-card.png';
                link.click();
            });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} >
            <DialogTitle sx={{ fontSize: '20px' }}>{' Membership Card'}</DialogTitle>
            <Box>

            </Box>
            <DialogContent sx={{ p: 2.5 }} >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            width: '400px',
                            height: { xs: '200px', sm: '250px' }, // Set height to 200px on small screens
                            borderRadius: '8px',
                            border: `1px solid ${colors.blue[6]}`,
                            boxShadow: 3,
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundColor: 'white',
                        }}
                        ref={componentRef}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: { xs: '65px', sm: '100px' }, // Set height to 50px on small screens
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0 20px',
                                position: 'relative', // Add position relative for the pseudo-element
                                backgroundColor: colors.orange[5],
                                overflow: 'hidden', // Hide any overflow
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: { xs: 10, sm: 15 },
                                    left: 10,
                                    right: 0,
                                    height: { xs: '65%', sm: '63%' }, // Set height to 100px on small screens
                                    width: { xs: '57%', sm: '65%' }, // Set width to 100px on small screens
                                    backgroundImage: 'url(https://res.cloudinary.com/dmfljlyu1/image/upload/v1726644594/booklogo_jyd8ys.png)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    zIndex: 1, // Ensure the image is below other content if necessary
                                }}
                            />

                            <Box>

                            </Box>
                            <Box>
                                <Avatar
                                    src={userGetById?.profileImage}
                                    alt="Profile"
                                    sx={{
                                        width: { xs: 60, sm: 90 },
                                        height: { xs: 60, sm: 90 },
                                        border: '1px solid', borderColor: 'primary.main'
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ padding: '20px' }}>
                            <Typography variant="h5">{`${userGetById?.firstName} ${userGetById?.lastName}`}</Typography>
                            <Typography variant="subtitle1" color="textSecondary">{userGetById?.occupation}</Typography>
                            <Grid container spacing={2} mt={0}>
                                <Grid item xs={5} sx={{
                                    marginTop: { xs: 0, sm: 2 }
                                }}>
                                    <Typography sx={{
                                        fontSize: { xs: '9px', sm: '12px' },
                                    }}
                                    >Library ID: {userGetById?._id?.slice(0, 10)}</Typography>
                                    <Typography sx={{
                                        fontSize: { xs: '9px', sm: '12px' },
                                    }}>Joined Date: {userGetById?.createdDate?.slice(0, 10)}</Typography>
                                </Grid>
                                <Grid item xs={4} sx={{
                                    marginTop: { xs: 0, sm: 2 }
                                }} ml={2}>
                                    <Typography variant="body2" >__________________</Typography>
                                    <Typography variant="body2" align='center' ml={3}>Signature</Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: { xs: '70px', sm: '60px' },
                                right: { xs: '10px', sm: '20px' },
                                width: { xs: '50px', sm: '70px' },
                                height: { xs: '50px', sm: '70px' },
                                borderRadius: '4px',
                                overflow: 'hidden',
                                backgroundColor: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <QrGenerator
                                qrValue={userGetById?._id?.toString() || ''}
                            />
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ p: 2.5 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>

                    </Grid>
                    <Grid item>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button color="error" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" onClick={handleDownload} >
                                {'Download'}
                            </Button>

                        </Stack>
                    </Grid>
                </Grid>
            </DialogActions>
        </LocalizationProvider>
    );
};

export default MembershipCard;
