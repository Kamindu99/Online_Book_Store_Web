// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { dispatch } from 'store';
import { updateBookorder } from 'store/reducers/book-order';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    deleteId: string;
}

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertPreOrderApprove({ title, open, handleClose, deleteId }: Props) {
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
                    <Avatar color={title === 'approve' ? 'success' : 'error'}
                        sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
                        {title === 'approve' ? <CheckOutlined /> : <CloseOutlined />}
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h4" align="center">
                            Are you sure {title} this pre-order?
                        </Typography>

                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                        <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button fullWidth color={title === 'approve' ? 'success' : 'error'}
                            variant="contained" onClick={() => {
                                // delete API call
                                dispatch(updateBookorder({
                                    _id: deleteId,
                                    approverComment: title === 'approve' ? 'Approved' : title === 'not borrow' ? 'Not Borrow' : 'Rejected',
                                    status: title === 'approve' ? 'Approved' : title === 'not borrow' ? 'Not Borrow' : 'Rejected'
                                }))
                                handleClose(true)
                            }} autoFocus>
                            {title === 'approve' ? 'Approve' : title === 'not borrow' ? 'Not Borrow' : 'Reject'}
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
