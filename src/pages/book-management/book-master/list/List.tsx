/* eslint-disable prettier/prettier */
import { Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';

// material ui
import {
    Button,
    Chip,
    Dialog,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

// third-party
import { PopupTransition } from 'components/@extended/Transitions';
import { EmptyTable, HeaderSort, SortingSelect, TablePagination, TableParamsType } from 'components/third-party/ReactTable';
import { NumericFormat } from 'react-number-format';
import { Cell, Column, HeaderGroup, Row, useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import {
    renderFilterTypes
} from 'utils/react-table';

// project import
import { DeleteTwoTone, EditTwoTone, EyeOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import AddEditBook from 'sections/book-management/book-master/AddEditBook';
import AlertBookDelete from 'sections/book-management/book-master/AlertBookDelete';
import { useDispatch, useSelector } from 'store';
import { getBooks, toInitialState } from 'store/reducers/book-master';
import { openSnackbar } from 'store/reducers/snackbar';
import { Books, listParametersType } from 'types/book-master';
import { ReactTableProps, dataProps } from './types/types';
import { Loading } from 'utils/loading';
import Avatar from 'components/@extended/Avatar';
import { useNavigate } from 'react-router-dom';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, handleAddEdit, getHeaderProps, tableParams }: ReactTableProps) {
    const theme = useTheme();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const sortBy = { id: '_id', desc: false };

    const filterTypes = useMemo(() => renderFilterTypes, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        allColumns,
        rows,
        page,
        state: { pageIndex },
        setSortBy,
    } = useTable(
        {
            columns,
            data,
            filterTypes,
            initialState: { pageIndex: tableParams?.page, pageSize: tableParams?.perPage },
            manualPagination: true,
            pageCount: tableParams?.pageCount,
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,

    );

    return (
        <>
            <Stack spacing={3}>
                <Stack
                    direction={matchDownSM ? 'column' : 'row'}
                    spacing={1}
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ p: 3, pb: 0 }}
                >
                    <Stack direction={matchDownSM ? 'column' : 'row'} spacing={1} alignItems="center">
                        <Grid item xs={12} sm={5} md={5}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                value={tableParams?.searchParam}
                                onChange={(e) => tableParams?.setSearchParam!(e.target.value)}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={3} md={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                size='large'
                                onClick={() => {
                                    tableParams?.setPage(0);
                                    tableParams?.setSearch!(tableParams?.searchParam!);
                                }}
                            >
                                <SearchOutlined />
                            </Button>
                        </Grid>
                    </Stack>

                    <Stack direction={matchDownSM ? 'column' : 'row'} alignItems="center" spacing={1}>
                        <SortingSelect sortBy={sortBy.id} setSortBy={setSortBy} allColumns={allColumns} />
                        <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddEdit} size="small">
                            Add New
                        </Button>

                    </Stack>
                </Stack>
                <Table {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map((headerGroup: HeaderGroup<{}>) => (
                            <TableRow {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                                {headerGroup.headers.map((column: HeaderGroup) => (
                                    <TableCell {...column.getHeaderProps([{ className: column.className }, getHeaderProps(column)])}>
                                        <HeaderSort column={column} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page.length > 0 ? (
                            page.map((row: Row, i: number) => {
                                prepareRow(row);
                                return (
                                    <Fragment key={i}>
                                        <TableRow
                                            {...row.getRowProps()}
                                            onClick={() => {
                                                row.toggleRowSelected();
                                            }}
                                            sx={{ bgcolor: 'inherit' }}
                                        >
                                            {row.cells.map((cell: Cell) => (
                                                <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                                            ))}
                                        </TableRow>
                                        {/* {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })} */}
                                    </Fragment>
                                );
                            })
                        ) : (
                            <EmptyTable msg="No Data" colSpan={9} />
                        )}
                        <TableRow>
                            <TableCell sx={{ p: 2 }} colSpan={12}>
                                <TablePagination
                                    gotoPage={tableParams?.setPage}
                                    rows={rows}
                                    setPageSize={tableParams?.setPerPage}
                                    pageIndex={pageIndex}
                                    pageSize={tableParams?.perPage}
                                    pageCount={tableParams?.pageCount}
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Stack>
        </>
    );
}

// ==============================|| List ||============================== //

const List = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { booksList, error, isLoading, success } = useSelector(state => state.book)

    const [book, setBook] = useState<dataProps>();
    const [bookList, setBookList] = useState<dataProps[]>([]);
    const [add, setAdd] = useState<boolean>(false);

    const handleAdd = () => {
        setAdd(!add);
        if (book && !add) setBook(undefined);
    };

    //alert model
    const [openAlert, setOpenAlert] = useState(false);
    const [userRoleId, setuserRoleId] = useState<string | null>(null)

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
    };

    const columns = useMemo(
        () =>
            [
                {
                    Header: '#',
                    accessor: '_id',
                    className: 'cell-center',
                    Cell: ({ row }: { row: Row }) => {
                        if (row.id === undefined || row.id === null || row.id === '') {
                            return <>-</>
                        }
                        if (typeof row.id === 'string') {
                            return <>{(parseInt(row.id) + 1).toString()}</>;
                        }
                        if (typeof row.id === 'number') {
                            return <>{row.id + 1}</>;
                        }
                        // Handle any other data types if necessary
                        return <>-</>;
                    }
                },
                {
                    Header: 'Code',
                    accessor: 'bookCode'
                },
                {
                    Header: 'Name',
                    accessor: 'bookName',
                    Cell: ({ row }: { row: Row }) => {

                        const values: Books = row?.original;
                        return (
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Avatar
                                    variant="rounded"
                                    alt={values.bookName}
                                    color="secondary"
                                    size="sm"
                                    src={values.imageUrl}
                                />
                                <Stack spacing={0}>
                                    <Typography variant="subtitle1">{values.bookName}</Typography>
                                </Stack>
                            </Stack>
                        );
                    }
                },
                {
                    Header: 'Author',
                    accessor: 'author'
                },
                {
                    Header: 'Category',
                    accessor: 'categoryName'
                },
                {
                    Header: 'Price',
                    accessor: 'price',
                    className: 'cell-right',
                    Cell: ({ value }: { value: number }) => {
                        return <div><NumericFormat value={value} displayType="text" thousandSeparator fixedDecimalScale decimalScale={2} prefix="Rs." /></div>;
                    }
                },
                {
                    Header: 'No of Page',
                    accessor: 'noOfPages',
                    className: 'cell-right',
                    Cell: ({ value }: { value: number }) => {
                        return <div><NumericFormat value={value} displayType="text" /></div>;
                    }
                },
                {
                    Header: 'Added Date',
                    accessor: 'createdDate',
                    Cell: ({ value }: { value: string }) => {
                        return <div>{value?.split('T')[0]}</div>;
                    }
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                    Cell: ({ value }: { value: string }) => {
                        switch (value) {
                            case "Out":
                                return <Chip color="warning" label="Out" size="small" />;
                            case "Listed":
                                return <Chip color="success" label="Listed" size="small" />;
                            case 'Disposal':
                                return <Chip color="error" label="Disposal" size="small" />;
                            case 'Ordered':
                                return <Chip color="error" label="Ordered" size="small" />;
                            default:
                                return <Chip color="warning" label="Penging" size="small" />;
                        }
                    }
                },
                {
                    id: "actions",
                    Header: 'Actions',
                    accessor: 'actions',
                    className: 'cell-center',
                    Cell: ({ row }: { row: Row }) => {
                        return (
                            <>
                                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                                    <Tooltip title="View">
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                navigate(`/book-management/book-master/view-book/${row.values._id}`);
                                            }}
                                        >
                                            <EyeOutlined twoToneColor={theme.palette.primary.main} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            color="primary"
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                const data: Books = row.original;
                                                e.stopPropagation();
                                                setBook({ ...data });
                                                handleAdd();
                                            }}
                                            disabled={row.values?.statusId === 2}
                                        >
                                            <EditTwoTone twoToneColor={theme.palette.primary.main} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                let data: Books = row.original;
                                                e.stopPropagation();
                                                setuserRoleId(data._id!)
                                                setOpenAlert(true)
                                            }}
                                        >
                                            <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                                        </IconButton>
                                    </Tooltip>
                                </Stack>
                            </>
                        )
                    }
                }
            ] as Column[],
        []
    );

    // ----------------------- | API Call - Roles | ---------------------

    const [page, setPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const [direction, setDirection] = useState<"asc" | "desc">("desc");
    const [searchParam, setSearchParam] = useState<string>("");
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
        searchParam,
        setSearchParam,
        pageCount: totalRecords
    }

    useEffect(() => {
        const listParameters: listParametersType = {
            page: page,
            per_page: perPage,
            direction: direction,
            sort: sort,
            search: search
        };
        dispatch(getBooks(listParameters));
    }, [dispatch, success, page, perPage, direction, sort, search]);

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

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            <MainCard content={false}>
                <ScrollX>
                    <ReactTable columns={columns}
                        getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()}
                        data={bookList} handleAddEdit={handleAdd} tableParams={tableParams} />
                </ScrollX>
            </MainCard>
            <Dialog
                maxWidth="sm"
                TransitionComponent={PopupTransition}
                keepMounted
                fullWidth
                onClose={handleAdd}
                open={add}
                sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                aria-describedby="alert-dialog-slide-description"
            >
                <AddEditBook book={book} onCancel={handleAdd} />
            </Dialog>
            {/* alert model */}
            {userRoleId && <AlertBookDelete title={""} open={openAlert} handleClose={handleAlertClose} deleteId={userRoleId} />}
        </>
    )
};

export default List;
