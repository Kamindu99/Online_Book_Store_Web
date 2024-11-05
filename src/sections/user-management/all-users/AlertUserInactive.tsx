// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { StopOutlined } from '@ant-design/icons';
import { dispatch } from 'store';
import { inactiveUser } from 'store/reducers/users';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    deleteId: string;
}

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertUserDelete({ title, open, handleClose, deleteId }: Props) {
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
                    <Avatar color={title === 'inactive' ? 'error' : 'success'} sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
                        <StopOutlined />
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h4" align="center">
                            Are you sure you want to {title} this user?
                        </Typography>

                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                        <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button fullWidth color={title === 'inactive' ? 'error' : 'success'} variant="contained" onClick={() => {
                            // delete API call
                            dispatch(inactiveUser(deleteId!, title === 'inactive' ? false : true));
                            handleClose(true)
                        }} autoFocus>
                            Inactive
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
