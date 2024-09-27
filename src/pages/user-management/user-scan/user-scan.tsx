import { Dialog, Grid } from '@mui/material';
import { PopupTransition } from 'components/@extended/Transitions';
import QrReader from 'components/third-party/QrScaner';
import { useEffect, useState } from 'react';
import ProfileTabs from 'sections/user-management/user-scan/ProfileTabs';
import TabPersonal from 'sections/user-management/user-scan/TabPersonal';
import { dispatch, useSelector } from 'store';
import { getUserById } from 'store/reducers/users';

function Userscan() {

    const [add, setAdd] = useState<boolean>(false);
    const [showProfile, setShowProfile] = useState(false); // State to control ProfileTabs rendering

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

    return (
        <div>
            <button
                onClick={() => { handleAdd(); setScannedResult(null) }}
                hidden={showProfile}
            >
                Scan QR Code- {scannedResult}
            </button>
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

                    <Grid item xs={12} md={3}>
                        <ProfileTabs userGetById={userGetById!} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <TabPersonal />
                    </Grid>

                </Grid>
            }
        </div>
    )
}

export default Userscan