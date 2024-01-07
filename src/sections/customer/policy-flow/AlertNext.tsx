// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { ArrowRightOutlined } from '@ant-design/icons';

// types
interface Props {
  open: boolean;
  handleClose: (status: boolean) => void;
  handleNext: () => void;
}

// ==============================|| CUSTOMER Next ||============================== //

export default function AlertNext({ open, handleClose, handleNext }: Props) {
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
            <ArrowRightOutlined />
          </Avatar>
          <Stack spacing={2}>
            <Typography variant="h4" align="center">
              Do you want to continue without saving?
            </Typography>
            {/* <Typography align="center">By saving, your details will not be deleted.</Typography> */}
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
                handleNext()
                handleClose(true);
              }}
              autoFocus
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
