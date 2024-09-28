import { Box, Button, Dialog, Grid, useMediaQuery, useTheme } from '@mui/material';
import { PopupTransition } from 'components/@extended/Transitions';
import QrReader from 'components/third-party/QrScaner';
import { useEffect, useState } from 'react';
import CustomerFormWizard from 'sections/user-management/user-scan';
import ProfileTabs from 'sections/user-management/user-scan/ProfileTabs';
import ProfileTabsMobile from 'sections/user-management/user-scan/ProfileTabsMobile';
import { dispatch, useSelector } from 'store';
import { getUserById } from 'store/reducers/users';

function Userscan() {

    const theme = useTheme();

    const [add, setAdd] = useState<boolean>(false);
    const [showProfile, setShowProfile] = useState(true); // State to control ProfileTabs rendering

    const handleAdd = () => {
        setAdd(!add);
    };

    const [scannedResult, setScannedResult] = useState<string | null>(null);

    useEffect(() => {
        if (scannedResult) {
            handleAdd();
            setShowProfile(true);
        }
        else {
            setShowProfile(false);
        }
    }, [scannedResult]);

    const { userGetById } = useSelector((state) => state.users);

    // Default Branch Set API
    useEffect(() => {
        if (typeof scannedResult === 'undefined') return;
        dispatch(getUserById(scannedResult!));
    }, [scannedResult]);

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <div>
            <div hidden={showProfile}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <img src="https://media.lordicon.com/icons/wired/flat/1686-scan-qr-code.svg"
                        alt="qr-code" style={{ cursor: 'pointer', height: '400px' }} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" onClick={handleAdd}>Scan QR Code</Button>
                </Box>
            </div>

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
                    <QrReader setScannedResult={setScannedResult} />
                </Dialog>
            }
            {showProfile &&
                <Grid container spacing={3}>
                    {matchDownMd ?
                        <Grid item xs={12} md={3}>
                            <ProfileTabsMobile userGetById={userGetById!} />
                        </Grid>
                        : <Grid item xs={12} md={3}>
                            <ProfileTabs userGetById={userGetById!} />
                        </Grid>
                    }
                    <Grid item xs={12} md={9}>
                        <CustomerFormWizard userId={scannedResult!} />
                    </Grid>

                </Grid>
            }
        </div>
    )
}

export default Userscan