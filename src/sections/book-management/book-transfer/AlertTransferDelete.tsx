// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { DeleteFilled } from '@ant-design/icons';
import { dispatch } from 'store';
import { updateReturnBooktransfer } from 'store/reducers/book-transfer';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    deleteId: string;
    bookId: string;
}

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertBookDelete({ title, open, handleClose, deleteId, bookId }: Props) {
    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            keepMounted
            TransitionComponent={PopupTransition}
            maxWidth="xs"
            aria-labelledby="column-delete-title"
            aria-describedby="column-delete-description"
        >
            <DialogContent sx={{ mt: 2, my: 1 }}>
                <Stack alignItems="center" spacing={3.5}>
                    <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
                        <DeleteFilled />
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h4" align="center">
                            Are you sure return this book?
                        </Typography>

                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                        <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button fullWidth color="error" variant="contained" onClick={() => {
                            // delete API call
                            dispatch(updateReturnBooktransfer(deleteId!, bookId!))
                            handleClose(true)
                        }} autoFocus>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
