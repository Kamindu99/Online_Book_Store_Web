// components/BookCard.tsx
import { DeleteTwoTone, EditTwoTone, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Box, Card, CardContent, CardMedia, IconButton, Typography, useTheme } from '@mui/material';
import useAuth from 'hooks/useAuth';
import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router';
import { dispatch } from 'store';
import { createBookfavourite, deleteBookfavourite } from 'store/reducers/favourite-book';
import { Books } from 'types/book-master';

interface BookCardProps {
    imageUrl: string;
    bookName: string;
    isActive: boolean;
    categoryName: string;
    author: string;
    noOfPages: number;
    bookId: string;
    isFavourite?: boolean;
    status: string;
    bookDetails: Books;
    handleAdd: () => void;
    setBook: (book: any) => void;
    setDeletedBookId: (bookId: string) => void;
    setOpenAlert: (open: boolean) => void;
}

const BookCard: React.FC<BookCardProps> = ({ imageUrl, bookName, author, isActive,
    categoryName, noOfPages, bookId, isFavourite, status, handleAdd, setBook, setDeletedBookId, setOpenAlert, bookDetails }) => {

    const { user } = useAuth()
    const Navigate = useNavigate();
    const theme = useTheme();

    const handleBorrow = (event: React.MouseEvent) => {
        // Prevent the event from propagating to the Card's onClick
        event.stopPropagation();
        // Handle the borrow action
        if (user) {
            if (!isFavourite) {
                dispatch(createBookfavourite({ bookId, userId: user.id }))
            } else {
                dispatch(deleteBookfavourite(bookId, user.id))
            }
        }
    };

    const handleCardClick = () => {
        if (isActive) {
            Navigate(`/book-management/book-master/view-book/${bookId}`)
        }
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                margin: 0,
                transition: '0.3s',
                opacity: isActive ? 1 : 0.8,
                cursor: isActive ? 'pointer' : 'not-allowed',
                position: 'relative',
                zIndex: 1,
                '&:hover': isActive
                    ? {
                        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
                        transform: 'scale(1.02)',
                    }
                    : {}
            }}
            onClick={isActive ? handleCardClick : undefined}
        >
            {/* Category label styled like a badge */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 10,
                    left: 0, // Align it to the left edge
                    padding: '0.2rem 0.5rem 0.2rem 0.8rem',
                    color: 'white',
                    fontWeight: 'bold',
                    backgroundColor: '#1b64e3', // Change to your preferred color
                    borderRadius: '0 0.3rem 0.3rem 0', // Rounded top-right and bottom-right corners
                    fontSize: '0.85rem',
                    transform: 'rotate(-10deg) translateX(-15%)', // Adds a slight angle and offset
                    whiteSpace: 'nowrap', // Prevent text from wrapping
                }}
            >
                {categoryName}
            </Box>
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
                        {status === 'Ordered' ? 'Ordered' : 'Not Available'}
                    </Box>
                )
            }
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
                {user && user.email === 'wanigasinghebookcollection@gmail.com' &&
                    <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginBottom: '0rem'
                        }}
                    >
                        Code - {bookDetails?.bookCode}
                    </Typography>
                }

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
                {user && user.email !== 'wanigasinghebookcollection@gmail.com' &&
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
                        disabled={!isActive}
                    >
                        {isFavourite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                    </IconButton>
                }
                {user && user.email === 'wanigasinghebookcollection@gmail.com' &&
                    <>
                        <IconButton
                            aria-label="Delete"
                            color="error"
                            sx={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,

                            }}
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                setDeletedBookId(bookId)
                                setOpenAlert(true)
                            }}
                            disabled={!isActive}
                        >
                            <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                        </IconButton>
                        {bookDetails &&
                            <IconButton
                                aria-label="Edit"
                                color="primary"
                                sx={{
                                    position: 'absolute',
                                    bottom: 10,
                                    right: 50,
                                    backgroundColor: 'white',
                                    color: 'black'
                                }}
                                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                    e.stopPropagation();
                                    setBook({ ...bookDetails });
                                    handleAdd();
                                }}
                                disabled={!isActive}
                            >
                                <EditTwoTone style={{ color: 'red' }} />
                            </IconButton>
                        }
                    </>
                }
            </CardContent>
        </Card >
    );
};

export default BookCard;
