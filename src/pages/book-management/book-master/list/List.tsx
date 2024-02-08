/* eslint-disable prettier/prettier */
import { Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';

// material ui
import {
    Button,
    Chip,
    Dialog,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    useMediaQuery,
    useTheme
} from '@mui/material';

// third-party
import { PopupTransition } from 'components/@extended/Transitions';
import { EmptyTable, HeaderSort, SortingSelect, TablePagination } from 'components/third-party/ReactTable';
import { NumericFormat } from 'react-number-format';
import { Cell, Column, HeaderGroup, Row, useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import {
    GlobalFilter,
    renderFilterTypes
} from 'utils/react-table';

// project import
import { CheckOutlined, DeleteTwoTone, EditTwoTone, PlusOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import AddEditBook from 'sections/book-management/book-master/AddEditBook';
import AlertBookDelete from 'sections/book-management/book-master/AlertBookDelete';
import { useDispatch, useSelector } from 'store';
import { approveBook, getBooks, toInitialState } from 'store/reducers/book-master';
import { openSnackbar } from 'store/reducers/snackbar';
import { Books } from 'types/book-master';
import { ReactTableProps, dataProps } from './types/types';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, handleAddEdit, getHeaderProps }: ReactTableProps) {
    const theme = useTheme();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const sortBy = { id: 'bookId', desc: false };

    const filterTypes = useMemo(() => renderFilterTypes, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        allColumns,
        rows,
        page,
        gotoPage,
        setPageSize,
        state: { globalFilter, pageIndex, pageSize },
        preGlobalFilteredRows,
        setGlobalFilter,
        setSortBy,
    } = useTable(
        {
            columns,
            data,
            filterTypes,
            initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: [''], sortBy: [sortBy] }
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
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                        size="small"
                    />
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
                                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
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
    const { books, error, isLoading, success } = useSelector(state => state.book)

    const [book, setBook] = useState<dataProps>();
    console.log(book);

    const [bookList, setBookList] = useState<dataProps[]>([]);
    const [add, setAdd] = useState<boolean>(false);

    const handleAdd = () => {
        setAdd(!add);
        if (book && !add) setBook(undefined);
    };

    //alert model
    const [openAlert, setOpenAlert] = useState(false);
    const [userRoleId, setuserRoleId] = useState<number | null>(null)

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
    };

    const approveBookById = (bookId: number) => {
        dispatch(approveBook(bookId))
    };

    const columns = useMemo(
        () =>
            [
                {
                    Header: '#',
                    accessor: 'bookId',
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
                    Header: 'Name',
                    accessor: 'bookName'
                },
                {
                    Header: 'Author',
                    accessor: 'author'
                },
                {
                    Header: 'Category',
                    accessor: 'category'
                },
                {
                    Header: 'Price',
                    accessor: 'price',
                    className: 'cell-right',
                    Cell: ({ value }: { value: number }) => {
                        return <div><NumericFormat value={value} displayType="text" thousandSeparator fixedDecimalScale decimalScale={2} prefix="Rs. " /></div>;
                    }
                },
                {
                    Header: 'No of Page',
                    accessor: 'noOfPage',
                    className: 'cell-right',
                    Cell: ({ value }: { value: number }) => {
                        return <div><NumericFormat value={value} displayType="text" /></div>;
                    }
                },
                {
                    Header: 'Added Date',
                    accessor: 'addedDate'
                },
                {
                    Header: 'Status',
                    accessor: 'statusId',
                    Cell: ({ value }: { value: number }) => {
                        switch (value) {
                            case 1:
                                return <Chip color="warning" label="Penging" size="small" />;
                            case 2:
                                return <Chip color="success" label="Approved" size="small" />;
                            case 3:
                                return <Chip color="error" label="Disposal" size="small" />;
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
                                            <EditTwoTone twoToneColor={row.values?.statusId === 2 ? theme.palette.secondary.main : theme.palette.primary.main} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Approve">
                                        <IconButton
                                            color="success"
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                const data: Books = row.original;
                                                e.stopPropagation();
                                                approveBookById(data.bookId!)
                                            }}
                                            disabled={row.values?.statusId === 2}
                                        >
                                            <CheckOutlined twoToneColor={theme.palette.success.main} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            color="error"
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                let data: Books = row.original;
                                                e.stopPropagation();
                                                setuserRoleId(data.bookId!)
                                                setOpenAlert(true)
                                            }}
                                            disabled={row.values?.statusId === 2}
                                        >
                                            <DeleteTwoTone twoToneColor={row.values?.statusId === 2 ? theme.palette.secondary.main : theme.palette.error.main} />
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

    useEffect(() => {
        dispatch(getBooks())
    }, [success])

    useEffect(() => {
        if (!books) {
            setBookList([])
            return
        }
        if (books == null) {
            setBookList([])
            return
        }
        setBookList(books!)
    }, [books])

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
        return <>Loading...</>
    }

    return (
        <>
            <MainCard content={false}>
                <ReactTable columns={columns}
                    getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()}
                    data={bookList} handleAddEdit={handleAdd} />
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
