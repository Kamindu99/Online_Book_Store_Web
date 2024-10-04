// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project imports
import Avatar from 'components/@extended/Avatar';

// assets
import { ReactNode } from 'react';

// ==============================|| PRODUCT DETAILS - REVIEW ||============================== //

interface ReviewProps {
  avatar: string;
  date: Date | string;
  name: string;
  rating: number;
  review: string;
}

const ProductReview = ({ avatar, date, name, rating, review }: ReviewProps) => (
  <Grid item xs={12}>
    <Stack direction="row" spacing={1}>
      <Avatar alt={name} src={avatar && ''} />
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
    </Stack>
  </Grid>
);

export default ProductReview;
