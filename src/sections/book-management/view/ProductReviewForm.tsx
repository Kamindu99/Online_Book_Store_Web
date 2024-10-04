// material-ui
import { DeleteOutlined } from '@ant-design/icons';
import { Grid, IconButton, Stack, Typography } from '@mui/material';

// project imports
import Avatar from 'components/@extended/Avatar';

// assets
import { ReactNode } from 'react';

// ==============================|| PRODUCT DETAILS - REVIEW ||============================== //

interface ReviewProps {
  reviewId: string;
  avatar: string;
  date: Date | string;
  name: string;
  review: string;
  removeReview: (deletBooKId: string) => void;
  canDelete?: boolean;
}

const ProductReview = ({ reviewId, avatar, date, name, review, removeReview, canDelete }: ReviewProps) => (
  <Grid item xs={12}>
    <Stack direction="row" spacing={1}>
      <Avatar alt={name} src={avatar && avatar} />
      <Stack spacing={2}>
        <Stack>
          <Typography variant="subtitle1" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
            {name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {date as ReactNode}
          </Typography>
        </Stack>
        <Typography variant="body2">{review}</Typography>
      </Stack>
      <IconButton
        aria-label="add to favorites"
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'black'
        }}
        onClick={() => removeReview(reviewId)}
        disabled={!canDelete}
      >
        <DeleteOutlined style={{ color: 'red' }} />
      </IconButton>
    </Stack>
  </Grid>
);

export default ProductReview;
