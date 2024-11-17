// components/BookCard.tsx
import { DeleteOutlined } from '@ant-design/icons';
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import React from 'react';

interface BookCardProps {
    imageUrl: string;
    bookName: string;
    categoryName: string;
    author: string;
    noOfPages: number;
    orderId: string;
    status: string;
    setBookTransferId: React.Dispatch<React.SetStateAction<string | null>>;
    setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookCard: React.FC<BookCardProps> = ({ imageUrl, bookName, author, status, categoryName, noOfPages, orderId, setOpenAlert, setBookTransferId }) => {

    const { user } = useAuth()

    const handleBorrow = () => {
        if (user && orderId) {
            setBookTransferId(orderId)
            setOpenAlert(true)
        }
    };

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
            {/* Conditionally render the "Booked" banner */}
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
                {status === 'Pending' ?
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
                        <DeleteOutlined style={{ color: 'red' }} />
                    </IconButton>
                    :
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 15,
                            right: 10,
                            backgroundColor: status === 'Approved' || status === 'Borrowed' ? '#d0f5dc' : status === 'Rejected' ? '#f58787' : '#f5c7b5',
                            color: 'black',
                            padding: '0.2rem 0.5rem 0.2rem 0.5rem',
                        }}
                    >{status}</div>
                }
            </CardContent>
        </Card >
    );
};

export default BookCard;
