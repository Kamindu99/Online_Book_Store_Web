import {
    Grid,
    Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { dispatch, useSelector } from 'store';
import { getBooksfavourite, toInitialState } from 'store/reducers/favourite-book';
import BookCard from './book-card';
import { openSnackbar } from 'store/reducers/snackbar';
import { Loading } from 'utils/loading';

const TabProfile = () => {

    const { user } = useAuth();
    const { booksfavouriteList, success, error, isLoading } = useSelector((state) => state.favouriteBook);

    // Default Branch Set API
    useEffect(() => {
        if (typeof user?.id === 'undefined') return;
        dispatch(getBooksfavourite({
            userId: user?.id!
        }));
    }, [user?.id, success]);

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

    if (isLoading) {
        return <Loading />
    }

    return (
        <MainCard>
            <Typography variant="h4" align="center" gutterBottom mb={5}>
                Favourite Books
            </Typography>
            <Grid container spacing={2}>
                {booksfavouriteList?.map((book) => (
                    <Grid item xs={6} sm={6} md={2.4} key={book._id!}>
                        <BookCard
                            imageUrl={book.bmBook?.imageUrl!}
                            bookName={book.bmBook?.bookName!}
                            author={book.bmBook?.author!}
                            noOfPages={book.bmBook?.noOfPages!}
                            category={book.bmBook?.category!}
                            isActive={book.bmBook?.isActive!}
                            bookId={book.bmBook?._id!}
                        />
                    </Grid>
                ))}
                {/* Grid Card */}


                {/* <Grid item xs={12} sm={12} md={12}>
            <TablePagination
                gotoPage={tableParams?.setPage}
                rows={[]}
                setPageSize={tableParams?.setPerPage}
                pageIndex={tableParams?.page}
                pageSize={tableParams?.perPage}
                pageCount={tableParams?.pageCount}
            />
        </Grid> */}
            </Grid >
        </MainCard>
    );
};

export default TabProfile;
