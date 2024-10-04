import { useEffect, useState } from 'react';

// material-ui
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// types

// project imports
import MainCard from 'components/MainCard';
import { useDispatch, useSelector } from 'store';
import ProductReview from './ProductReviewForm';

// assets
import { FileAddOutlined, SmileOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import IconButton from 'components/@extended/IconButton';
import { createBookReviews, deleteBookReviews, getBookReviewsList, toInitialState } from 'store/reducers/book-reviews';
import useAuth from 'hooks/useAuth';
import { openSnackbar } from 'store/reducers/snackbar';
import { Loading } from 'utils/loading';


// ==============================|| PRODUCT DETAILS - REVIEWS ||============================== //

const ProductReviews = ({ product }: { product: string }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useAuth()

  const { bookReviewsList, error, isLoading, success } = useSelector((state) => state.bookReview);

  const [perPage, setPerPage] = useState(3);

  const [review, setReview] = useState('');

  useEffect(() => {
    if (product === "" || product === undefined) return;
    let params = {
      bookId: product,
      direction: 'desc',
      per_page: perPage
    };
    dispatch(getBookReviewsList(params));
  }, [product, perPage, success]);

  const AddReview = () => {
    if (review === "") return;
    dispatch(createBookReviews({
      userId: user?.id!,
      bookId: product!,
      comment: review
    }));
  }

  const RemoveReview = (deletBooKId: string) => {
    if (deletBooKId === "" || deletBooKId !== user?.id) return;
    dispatch(deleteBookReviews(deletBooKId));
  }

  useEffect(() => {
    if (error != null) {
      let defaultErrorMessage = "ERROR";
      // @ts-ignore
      const errorExp = error as Template1Error
      if (errorExp.message) {
        defaultErrorMessage = errorExp.message
      }
      dispatch(
        openSnackbar({
          open: true,
          message: defaultErrorMessage,
          variant: 'alert',
          alert: {
            color: 'error'
          },
          close: true
        })
      );
      dispatch(toInitialState());
    }
  }, [error]);

  useEffect(() => {
    if (success != null) {
      dispatch(
        openSnackbar({
          open: true,
          message: success,
          variant: 'alert',
          alert: {
            color: 'success'
          },
          close: true
        })
      );
      dispatch(toInitialState());
      setReview('');
    }
  }, [success])

  if (isLoading) {
    return <Loading />
  }

  return (
    <Grid container spacing={3}>
      {bookReviewsList?.result &&
        bookReviewsList?.result?.map((review, index) => (
          <Grid item xs={12} key={index}>
            <MainCard sx={{ bgcolor: theme.palette.grey.A50 }}>
              <ProductReview
                reviewId={review._id!}
                avatar={review.umUser?.profileImage!}
                date={review?.createdDate?.split('T')[0]!}
                name={review?.umUser?.name!}
                review={review?.comment!}
                removeReview={RemoveReview}
                canDelete={user?.id === review.umUser?.id}
              />
            </MainCard>
          </Grid>
        ))}
      <Grid item xs={12} hidden={bookReviewsList?.pagination?.total === 0 || bookReviewsList === null}>
        <Stack direction="row" justifyContent="center">
          <Button variant="text" sx={{ textTransform: 'none' }} onClick={() => { bookReviewsList?.pagination?.total! > perPage! ? setPerPage(perPage + 3) : setPerPage(3) }}>
            {bookReviewsList?.pagination?.total! > perPage! ? ' View more comments' : 'less comments'}
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
                value={review}
                onChange={(e) => setReview(e.target.value)}
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
              <Button size="small" variant="contained" color="primary" onClick={AddReview}>
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
