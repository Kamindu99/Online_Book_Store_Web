import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';
import { getBookById } from 'store/reducers/book-master'; // assuming you have a fetch function

const ViewBook = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { bookById } = useSelector(state => state.book)

    useEffect(() => {
        dispatch(getBookById(id!));
    }, [id, dispatch]);

    const handleFavourite = () => {
        // Add to favorite logic here
    };

    return (
        <Grid container spacing={4} className="view-book-container" alignItems="center">
            {/* Book Image Section */}
            <Grid item xs={12} md={5} className="book-image-container">
                <Box display="flex" justifyContent="center">
                    <img
                        src={bookById?.imageUrl}
                        alt={bookById?.bookName}
                        className="book-image"
                    />
                </Box>
            </Grid>

            {/* Book Details Section */}
            <Grid item xs={12} md={7}>
                <Stack spacing={2}>
                    <Typography variant="h4">{bookById?.bookName}</Typography>
                    <Typography variant="h6" color="textSecondary">
                        Price: ${bookById?.price}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Category: {bookById?.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" paragraph>
                        This book is written by {bookById?.author} and has {bookById?.noOfPages} pages.
                        Now available for purchase. Grab your copy now! 📚.
                    </Typography>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        {/* Favorite Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFavourite}
                            startIcon={bookById?.isActive ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                        >
                            {bookById?.isActive ? 'Remove from Favorites' : 'Add to Favorites'}
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default ViewBook;
