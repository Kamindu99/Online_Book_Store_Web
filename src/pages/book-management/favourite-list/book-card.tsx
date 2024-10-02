// components/BookCard.tsx
import { HeartFilled } from '@ant-design/icons';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { dispatch } from 'store';
import { deleteBookfavourite } from 'store/reducers/favourite-book';

interface BookCardProps {
    imageUrl: string;
    bookName: string;
    isActive: boolean;
    categoryName: string;
    author: string;
    noOfPages: number;
    bookId: string;
}

const BookCard: React.FC<BookCardProps> = ({ imageUrl, bookName, author, isActive, categoryName, noOfPages, bookId }) => {

    const { user } = useAuth()

    const handleBorrow = () => {
        // Handle the borrow action
        if (user) {
            dispatch(deleteBookfavourite(bookId, user.id))
        }
    };

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
                    {noOfPages} pages
                </Typography>
                <IconButton
                    aria-label="add to favorites"
                    sx={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        color: 'black'
                    }}
                    onClick={handleBorrow}
                >
                    <HeartFilled style={{ color: 'red' }} />
                </IconButton>
            </CardContent>
        </Card >
    );
};

export default BookCard;
