/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material ui
import {
    Grid
} from '@mui/material';

// third-party
import { TablePagination, TableParamsType } from 'components/third-party/ReactTable';

// project import
import { Card, CardMedia, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';
import { getBookstransfer, toInitialState } from 'store/reducers/book-transfer';
import { openSnackbar } from 'store/reducers/snackbar';
import { Bookstransfer } from 'types/book-transfer';
import { Loading } from 'utils/loading';

// ==============================|| REACT TABLE ||============================== //




// ==============================|| Transfer Book List ||============================== //

const AllBorrowBooksList = ({ userId }: { userId: string }) => {
    const dispatch = useDispatch();
    const [bookList, setBookList] = useState<Bookstransfer[]>([]);

    // ----------------------- | API Call - Roles | ---------------------

    const { bookstransferList, error, isLoading, success } = useSelector(state => state.bookTransfer)

    const [page, setPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const [direction, setDirection] = useState<"asc" | "desc">("asc");
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
                {bookList.map((book) => (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ width: "100%" }}>
                        <Card sx={{ height: '100px' }}>
                            <Grid container>
                                <Grid item xs={2.5}>
                                    <CardMedia
                                        component="img"
                                        height="100%"
                                        image={book.bmBook?.imageUrl}
                                        alt={book.bmBook?.bookName}
                                        sx={{ width: "100%" }}
                                    />
                                </Grid>
                                <Grid item xs={9.5}>
                                    <div style={{ padding: '15px' }}>
                                        <Typography variant="h5" mb={1} sx={{
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            marginBottom: '0.2rem'
                                        }}>
                                            {book.bmBook?.bookName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Get Date - {book.transferedate}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Return Date - {book.returnDate}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Card>

                    </Grid>
                ))}
                {/* Grid Card */}


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

export default AllBorrowBooksList;