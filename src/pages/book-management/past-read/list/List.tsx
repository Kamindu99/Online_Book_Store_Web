/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material ui
import {
    Grid,
    Stack
} from '@mui/material';

// third-party
import { EmptyTable, TablePagination, TableParamsType } from 'components/third-party/ReactTable';

// project import
import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';
import { getBookstransfer, toInitialState } from 'store/reducers/book-transfer';
import { openSnackbar } from 'store/reducers/snackbar';
import { Loading } from 'utils/loading';
import BookCard from './book-card';
import { dataProps } from './types/types';

// ==============================|| REACT TABLE ||============================== //




// ==============================|| Transfer Book List ||============================== //

const TransferBookList = () => {
    const dispatch = useDispatch();
    const [bookList, setBookList] = useState<dataProps[]>([]);

    // ----------------------- | API Call - Roles | ---------------------

    const { bookstransferList, error, isLoading, success } = useSelector(state => state.bookTransfer)

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

    const { user } = useAuth()

    useEffect(() => {
        dispatch(getBookstransfer(
            {
                direction: direction,
                page: page,
                per_page: perPage,
                search: search,
                sort: sort,
                userId: user?.id,
                isActive: false
            }
        ))
    }, [dispatch, success, page, perPage, direction, sort, search]);

    useEffect(() => {
        if (!bookstransferList) {
            setBookList([])
            return
        }
        if (bookstransferList == null) {
            setBookList([])
            return
        }
        setBookList(bookstransferList?.result!)
        setTotalRecords(bookstransferList?.pagination?.total!)
    }, [bookstransferList])

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
        <>
            <Grid container spacing={2}>
                {bookList && bookList.length !== 0 ? <>
                    {bookList.map((book) => (
                        <Grid item xs={12} sm={12} md={2.4} lg={2.4} xl={2.4} sx={{ width: "100%" }}>
                            <BookCard
                                imageUrl={book.bmBook?.imageUrl!}
                                bookName={book.bmBook?.bookName!}
                                author={book.bmBook?.author!}
                                transferedate={book?.transferedate!}
                                returnDate={book?.returnDate!}
                                categoryName={book.bmBook?.categoryName!}
                            />
                        </Grid>
                    ))}
                </> :
                    <Stack spacing={2} sx={{ width: "100%" }} alignItems="center">
                        <EmptyTable msg="No Data" colSpan={12} />
                    </Stack>
                }

                <Grid item xs={12} sm={12} md={12}>
                    <TablePagination
                        gotoPage={tableParams?.setPage}
                        rows={[]}
                        setPageSize={tableParams?.setPerPage}
                        pageIndex={tableParams?.page}
                        pageSize={tableParams?.perPage}
                        pageCount={tableParams?.pageCount}
                    />
                </Grid>
            </Grid >
        </>
    )
};

export default TransferBookList;