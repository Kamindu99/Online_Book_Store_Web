// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { SaveOutlined } from '@ant-design/icons';

// types
interface Props {
  open: boolean;
  handleClose: (status: boolean) => void;
}

// ==============================|| CUSTOMER SAVE- SUCCESS ||============================== //

export default function AlertSaveSuccess({ open, handleClose }: Props) {
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
          <Avatar color="success" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
            <SaveOutlined />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Are you sure you want to save?
            </Typography>
            <Typography align="center">By saving, your details will not be deleted.</Typography>
          </Stack>

          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
              Cancel
            </Button>
            <Button
              fullWidth
              color="success"
              variant="contained"
              onClick={() => {
                handleClose(true);
              }}
              autoFocus
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
