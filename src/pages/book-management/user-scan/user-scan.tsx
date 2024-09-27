import { Dialog } from '@mui/material'
import { PopupTransition } from 'components/@extended/Transitions';
import QrReader from 'components/third-party/QrScaner'
import { useEffect, useState } from 'react';

function Userscan() {

    const [add, setAdd] = useState<boolean>(false);

    const handleAdd = () => {
        setAdd(!add);
    };

    const [scannedResult, setScannedResult] = useState<string | null>(null);

    useEffect(() => {
        if (scannedResult) {
            add && setAdd(false);
        }
    }, [scannedResult]);

    return (
        <div>
            <button
                onClick={() => { handleAdd(); setScannedResult(null) }}
            >
                Scan QR Code- {scannedResult}</button>
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
        </div>
    )
}

export default Userscan