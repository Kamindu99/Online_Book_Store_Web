// components/BookCard.tsx
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

interface BookCardProps {
    imageUrl: string;
    bookName: string;
    categoryName: string;
    author: string;
    returnDate: string;
    transferedate: string;
}

const BookCard: React.FC<BookCardProps> = ({ imageUrl, bookName, author, categoryName, returnDate, transferedate }) => {

    return (
        <Card sx={{
            maxWidth: 345,
            margin: 0,
            transition: '0.3s',
            opacity: 1,
            cursor: 'pointer',
            position: 'relative',
            '&:hover': {
                boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                scale: '1.02'
            }
        }}>
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
                {categoryName}
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
                    Borrow Date - {transferedate}<br />
                    Return Date - {returnDate}
                </Typography>
            </CardContent>
        </Card >
    );
};

export default BookCard;
