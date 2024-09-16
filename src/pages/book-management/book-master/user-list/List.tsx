/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material ui
import {
    Grid
} from '@mui/material';

// third-party

// project import
import { useDispatch, useSelector } from 'store';
import { getBooks, toInitialState } from 'store/reducers/book-master';
import { openSnackbar } from 'store/reducers/snackbar';
import BookCard from './book-card';
import { dataProps } from './types/types';

// ==============================|| List ||============================== //

const List = () => {

    const dispatch = useDispatch();
    const { booksList, error, isLoading, success } = useSelector(state => state.book)

    const [bookList, setBookList] = useState<dataProps[]>([]);


    // ----------------------- | API Call - Roles | ---------------------

    useEffect(() => {
        dispatch(getBooks(
            {
                direction: "desc",
                page: 0,
                per_page: 10,
                search: '',
                sort: "_id"
            }
        ))
    }, [success])

    useEffect(() => {
        if (!booksList) {
            setBookList([])
            return
        }
        if (booksList == null) {
            setBookList([])
            return
        }
        setBookList(booksList?.result!)
    }, [booksList])

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
        }
    }, [success])

    const handleBorrow = (bookId: string) => {
        // Handle the borrow action
        console.log(`Borrowing book with id ${bookId}`);
    };

    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <>
            <Grid container spacing={2}>
                {bookList.map((book) => (
                    <Grid item xs={12} sm={6} md={3} key={book._id!}>
                        <BookCard
                            imageUrl={book.imageUrl!}
                            bookName={book.bookName!}
                            author={book.author!}
                            onBorrow={() => handleBorrow(book._id!)}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    )
};

export default List;
