// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';
import { dispatch } from 'store';

// assets
import { DeleteFilled } from '@ant-design/icons';
import { deleteBook } from 'store/reducers/book-master';

// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    deleteId: number;
}

// ==============================|| CUSTOMER - DELETE ||============================== //

export default function AlertBookDelete({ title, open, handleClose, deleteId }: Props) {
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

            </DialogContent>
        </Dialog>
    );
}
