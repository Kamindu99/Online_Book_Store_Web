// components/BookCard.tsx
import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Grid, Stack } from '@mui/material';
import AnimateButton from 'components/@extended/AnimateButton';

interface BookCardProps {
    imageUrl: string;
    bookName: string;
    author: string;
    onBorrow: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ imageUrl, bookName, author, onBorrow }) => {
    return (
        <Card sx={{
            maxWidth: 345,
            margin: 0,
            transition: '0.3s',
            cursor: 'pointer',
            '&:hover': {
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                scale: '1.02'
            }
        }}>
            <CardMedia
                component="img"
                height="300"
                image={imageUrl}
                alt={bookName}
            />
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {bookName}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {author}
                </Typography>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end">

                        <AnimateButton>
                            <Button variant="contained" color="primary" onClick={onBorrow} sx={{ mt: 2 }}>
                                Borrow
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default BookCard;
