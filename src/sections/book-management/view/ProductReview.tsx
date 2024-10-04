import { useEffect, useState } from 'react';

// material-ui
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// types
import { Products, Reviews } from 'types/e-commerce';

// project imports
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'store';
import { getProductReviews } from 'store/reducers/product';
import ProductReview from './ProductReviewForm';

// assets
import { FileAddOutlined, SmileOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';


// ==============================|| PRODUCT DETAILS - REVIEWS ||============================== //

const ProductReviews = ({ product }: { product: Products }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [reviews] = useState<Reviews[]>([
    {
      "id": "1",
      "rating": 4.0367,
      "review": "Ceraruz obihagali ve otabiho owa kuuvo le ca uhe jaato obune vib. Uf ithigi wal goscok loh izusabem zacu gatbini ce gihhaf ce kim rec sib icwop.",
      "date": "2024-10-04T18:36:42.567Z",
      "profile": {
        "avatar": "avatar-1.png",
        "name": "Marion Murray",
        "status": true
      }
    },
    {
      "id": "2",
      "rating": 2.8111,
      "review": "Sivwu cupjene nusfun ci puedco macvag jewdub bo heojabe ijocehcoj funvehfu zilzifo. Heeva wagun bupsuku nuvapo pac gakfo dofguwut nethugun men de la uhere fen oteroodo pus ezhirep.",
      "date": "2024-09-29T07:26:42.569Z",
      "profile": {
        "avatar": "avatar-2.png",
        "name": "Lucas Little",
        "status": true
      }
    },
    {
      "id": "3",
      "rating": 3.4368,
      "review": "Gijah gi kowjawgi vi viwite otvitfo hoibibo peusvoj roj li vil dawjefco huv tupotlin taud wuzogefi. Tasev efasilov jo tah ucwo jocofcuc copwew fa zarzu guwuh rih wez mu ekmishu tupparap nu vipigafu.",
      "date": "2024-09-26T14:01:42.570Z",
      "profile": {
        "avatar": "avatar-3.png",
        "name": "Eula Williamson",
        "status": true
      }
    }
  ]);
  const productState = useSelector((state) => state.product);

  useEffect(() => {
    ///setReviews(productState.reviews);
  }, [productState]);

  useEffect(() => {
    dispatch(getProductReviews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={3}>
      {reviews &&
        reviews.map((review, index) => (
          <Grid item xs={12} key={index}>
            <MainCard sx={{ bgcolor: theme.palette.grey.A50 }}>
              <ProductReview
                avatar={review.profile.avatar}
                date={review.date}
                name={review.profile.name}
                rating={review.rating}
                review={review.review}
              />
            </MainCard>
          </Grid>
        ))}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="center">
          <Button variant="text" sx={{ textTransform: 'none' }}>
            {' '}
            View more comments{' '}
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ p: 2, pb: 1.5, border: `1px solid ${theme.palette.divider}` }}>
          <Grid container alignItems="center" spacing={0.5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Add Comment"
                sx={{
                  mb: 3,
                  '& input': { bgcolor: 'transparent', p: 0, borderRadius: '0px' },
                  '& fieldset': { display: 'none' },
                  '& .MuiFormHelperText-root': {
                    ml: 0
                  },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'transparent',
                    '&.Mui-focused': {
                      boxShadow: 'none'
                    }
                  }
                }}
              />
            </Grid>
            <Grid item>
              <IconButton>
                <VideoCameraAddOutlined />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <FileAddOutlined />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton>
                <SmileOutlined />
              </IconButton>
            </Grid>
            <Grid item xs zeroMinWidth />
            <Grid item>
              <Button size="small" variant="contained" color="primary">
                Comment
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProductReviews;
