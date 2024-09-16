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
import { TablePagination, TableParamsType } from 'components/third-party/ReactTable';
import { listParametersType } from 'types/book-master';

// ==============================|| List ||============================== //

const List = () => {

    const dispatch = useDispatch();
    const { booksList, error, isLoading, success } = useSelector(state => state.book)

    const [bookList, setBookList] = useState<dataProps[]>([]);


    // ----------------------- | API Call - Roles | ---------------------

    const [page, setPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const [direction, setDirection] = useState<"asc" | "desc">("desc");
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("_id");
    const [totalRecords, setTotalRecords] = useState<number>(0);

    const tableParams: TableParamsType = {
        page,
        setPage,
        perPage,
        setPerPage,
        direction,
        setDirection,
        sort,
        setSort,
        search,
        setSearch,
        pageCount: totalRecords
    }

    useEffect(() => {
        const listParameters: listParametersType = {
            page: page,
            per_page: perPage,
            direction: direction,
            sort: sort
        };
        dispatch(getBooks(listParameters));
    }, [dispatch, success, page, perPage, direction, sort]);

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
        setTotalRecords(booksList?.pagination?.total!)
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
                    <Grid item xs={12} sm={6} md={2.4} key={book._id!}>
                        <BookCard
                            imageUrl={book.imageUrl!}
                            bookName={book.bookName!}
                            author={book.author!}
                            onBorrow={() => handleBorrow(book._id!)}
                        />
                    </Grid>

                ))}
                <Grid item xs={12}>
                    <TablePagination
                        gotoPage={tableParams?.setPage}
                        rows={[]}
                        setPageSize={tableParams?.setPerPage}
                        pageIndex={tableParams?.page}
                        pageSize={tableParams?.perPage}
                        pageCount={tableParams?.pageCount}
                    />
                </Grid>
            </Grid>
        </>
    )
};

export default List;
