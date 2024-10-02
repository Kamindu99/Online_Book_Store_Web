/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material ui
import {
    Grid
} from '@mui/material';

// third-party
import { TablePagination, TableParamsType } from 'components/third-party/ReactTable';

// project import
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';
import { getBookstransfer, toInitialState } from 'store/reducers/book-transfer';
import { openSnackbar } from 'store/reducers/snackbar';
import { Loading } from 'utils/loading';
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
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ width: "100%" }}>
                        <Card >
                            <Box sx={{ display: "flex" }}>
                                <CardMedia
                                    component="img"
                                    image={book?.bmBook?.imageUrl!}
                                    height="240"
                                    width='100'
                                    alt="Live from space album cover"
                                />
                                <CardContent sx={{ flex: "1 0 auto", position: 'relative' }}>
                                    <Typography
                                        component="div"
                                        variant="h5"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {book?.bmBook?.bookName!}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        component="div"
                                    >
                                        {book?.bmBook?.author!}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color="text.secondary"
                                        component="div"
                                    >
                                        {book?.bmBook?.categoryName!}
                                    </Typography>
                                    <div style={{ bottom: 20, position: 'absolute', zIndex: 1 }}>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary"
                                            component="div"
                                        >
                                            Barrow -  {book?.transferedate!}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary"
                                            component="div"
                                        >
                                            Return -  {book?.returnDate!}
                                        </Typography>
                                    </div>

                                </CardContent>
                            </Box>
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

export default TransferBookList;