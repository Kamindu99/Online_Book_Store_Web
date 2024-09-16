// components/BookCard.tsx
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

interface BookCardProps {
    imageUrl: string;
    bookName: string;
    isActive: boolean;
    category: string;
    author: string;
    noOfPages: number;
    onBorrow: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ imageUrl, bookName, author, isActive, category, noOfPages, onBorrow }) => {
    return (
        <Card sx={{
            maxWidth: 345,
            margin: 0,
            transition: '0.3s',
            opacity: isActive ? 1 : 0.8,
            cursor: 'pointer',
            position: 'relative',
            '&:hover': isActive ? {
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                scale: '1.02'
            }
                : {}
        }}>
            {/* Conditionally render the "Booked" banner */}
            {
                !isActive && (
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent overlay
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.5rem',
                        boxShadow: '0 0 10px 0 rgba(0,0,0,1)',
                        fontWeight: 'bold',
                        zIndex: 1, // Ensure the banner is on top of everything
                    }}>
                        Not Available
                    </Box>
                )
            }
            <Box sx={{
                position: 'absolute',
                top: 10,
                right: 0,
                padding: '0.2rem 0.5rem 0.2rem 0.5rem',
                borderRadius: '0.3rem 0 0 0.3rem',
                color: 'black',
                fontWeight: 'bold',
                zIndex: 1,
                backgroundColor: '#c0db88',
            }}>
                {category}
            </Box>
            <CardMedia
                component="img"
                sx={{
                    height: {
                        xs: 240,
                        md: 280
                    }
                }}
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
                        textOverflow: 'ellipsis',
                        marginBottom: '0.2rem'
                    }}
                >
                    {bookName}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '0.2rem'
                }}>
                    {author}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginBottom: '0.2rem'
                }}>
                    {noOfPages} pages
                </Typography>
                {/* <Grid item xs={12}>
                    <Stack direction="row" justifyContent="flex-end">

                        <AnimateButton>
                            <Button variant="contained" color="primary" onClick={onBorrow} sx={{ mt: 2 }}
                                disabled={!isActive}>
                                Borrow
                            </Button>
                        </AnimateButton>
                    </Stack>
                </Grid> */}
            </CardContent>
        </Card >
    );
};

export default BookCard;
