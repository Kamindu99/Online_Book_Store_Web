/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material ui
import {
    Grid,
    Stack
} from '@mui/material';

// third-party
import { TablePagination, TableParamsType } from 'components/third-party/ReactTable';

// project import
import { Card, CardMedia, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'store';
import { getBookstransfer, toInitialState } from 'store/reducers/book-transfer';
import { openSnackbar } from 'store/reducers/snackbar';
import { Bookstransfer } from 'types/book-transfer';
import { Loading } from 'utils/loading';
import { ThemeMode } from 'types/config';
import { styled } from '@mui/material/styles';
// ==============================|| REACT TABLE ||============================== //


const StyledGridOverlay = styled(Stack)(({ theme }) => ({
    height: '120px',
    '& .ant-empty-img-1': {
        fill: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[200] : theme.palette.secondary[400]
    },
    '& .ant-empty-img-2': {
        fill: theme.palette.secondary.light
    },
    '& .ant-empty-img-3': {
        fill: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary.A200 : theme.palette.secondary[200]
    },
    '& .ant-empty-img-4': {
        fill: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary.A300 : theme.palette.secondary.A100
    },
    '& .ant-empty-img-5': {
        fillOpacity: theme.palette.mode === ThemeMode.DARK ? '0.09' : '0.95',
        fill: theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary.light : theme.palette.secondary.darker
    }
}));

// ==============================|| Transfer Book List ||============================== //

const DueBorrowBooksList = ({ userId }: { userId: string }) => {
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

    useEffect(() => {
        dispatch(getBookstransfer(
            {
                direction: direction,
                page: page,
                per_page: perPage,
                search: search,
                sort: sort,
                userId: userId,
                isActive: true
            }
        ))
    }, [dispatch, success, page, perPage, direction, sort, search, userId]);

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
                {bookList?.length > 0 ? <>
                    {bookList.map((book) => (
                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ width: "100%" }}>
                            <Card sx={{ height: '100px' }}>
                                <Grid container>
                                    <Grid item xs={3} sm={2.5}>
                                        <CardMedia
                                            component="img"
                                            height="103%"
                                            image={book.bmBook?.imageUrl}
                                            alt={book.bmBook?.bookName}
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                    <Grid item xs={9} sm={9.5}>
                                        <div style={{ padding: '15px' }}>
                                            <Typography mb={1} sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                marginBottom: { xs: '0.5rem', sm: '0.2rem' },
                                                fontSize: { xs: '0.8rem', sm: '16px' },
                                                fontWeight: '600'
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
                </> : <div style={{ minHeight: '200px' }}>
                    <div style={{
                        display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center", bottom: 0, left: 0, position: "absolute", right: 0, top: 80
                    }}>
                        <StyledGridOverlay alignItems="center" justifyContent="center" spacing={1}>
                            <svg width="120" height="100" viewBox="0 0 184 152" aria-hidden focusable="false">
                                <g fill="none" fillRule="evenodd">
                                    <g transform="translate(24 31.67)">
                                        <ellipse className="ant-empty-img-5" cx="67.797" cy="106.89" rx="67.797" ry="12.668" />
                                        <path
                                            className="ant-empty-img-1"
                                            d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
                                        />
                                        <path
                                            className="ant-empty-img-2"
                                            d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
                                        />
                                        <path
                                            className="ant-empty-img-3"
                                            d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
                                        />
                                    </g>
                                    <path
                                        className="ant-empty-img-3"
                                        d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
                                    />
                                    <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
                                        <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
                                        <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
                                    </g>
                                </g>
                            </svg>
                            <Typography align="center" color="secondary">
                                No Data Found
                            </Typography>
                        </StyledGridOverlay>
                    </div>
                </div>
                }
            </Grid >
        </>
    )
};

export default DueBorrowBooksList;