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
    alpha,
    useMediaQuery,
    useTheme
} from '@mui/material';

// third-party
import { PopupTransition } from 'components/@extended/Transitions';
import { EmptyTable, HeaderSort, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import { Cell, Column, HeaderGroup, Row, useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';

import {
    GlobalFilter,
    renderFilterTypes
} from 'utils/react-table';

// project import
import { EditTwoTone, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import AddEditTransfer from 'sections/book-management/book-transfer/AddEditTransfer';
import { useDispatch, useSelector } from 'store';
import { getBookstransfer, toInitialState } from 'store/reducers/book-transfer';
import { openSnackbar } from 'store/reducers/snackbar';
import { Books } from 'types/book-master';
import { ReactTableProps, dataProps } from './types/types';
import { Bookstransfer } from 'types/book-transfer';
import AlertBookDelete from 'sections/book-management/book-transfer/AlertTransferDelete';
import { Loading } from 'utils/loading';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, handleAddEdit, getHeaderProps }: ReactTableProps) {
    const theme = useTheme();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
    const sortBy = { id: 'id', desc: false };

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
        state: { globalFilter, selectedRowIds, pageIndex, pageSize },
        preGlobalFilteredRows,
        setGlobalFilter,
        setSortBy,
    } = useTable(
        {
            columns,
            data,
            filterTypes,
            initialState: { pageIndex: 0, pageSize: 10, hiddenColumns: ['avatar'], sortBy: [sortBy] }
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect
    );

    return (
        <>
            <TableRowSelection selected={Object.keys(selectedRowIds).length} />
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
                                            sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
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
                            <EmptyTable msg="No Data" colSpan={12} />
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

// ==============================|| Transfer Book List ||============================== //

const TransferBookList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [customer, setCustomer] = useState<any>(null);
    const [add, setAdd] = useState<boolean>(false);
    const [bookList, setBookList] = useState<dataProps[]>([]);

    const handleAdd = () => {
        setAdd(!add);
        if (customer && !add) setCustomer([]);
    };
    //render table
    const columns = useMemo(
        () =>
            [
                {
                    Header: '#',
                    accessor: 'id',
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
                    accessor: 'bmBook.bookCode'
                },
                {
                    Header: 'Name',
                    accessor: 'bmBook.bookName'
                },
                {
                    Header: 'Author',
                    accessor: 'bmBook.author'
                },
                {
                    Header: 'Category',
                    accessor: 'bmBook.categoryName'
                },
                {
                    Header: 'Person',
                    accessor: 'umUser.name'
                },
                {
                    Header: 'Borrow Date',
                    accessor: 'transferedate',
                },
                {
                    Header: 'Return Date',
                    accessor: 'returnDate',
                },
                // {
                //     Header: 'Penalty',
                //     accessor: 'penalty',
                //     className: 'cell-right',
                //     Cell: ({ row, value }) => {
                //         const today = new Date().toISOString().split('T')[0];
                //         //@ts-ignore
                //         const daysOverdue = Math.floor((new Date(today) - new Date(row?.values?.returnDate)) / (1000 * 60 * 60 * 24));
                //         const penaltyAmount = daysOverdue * 20;
                //         return new Intl.NumberFormat('en-US', {
                //             style: 'decimal',
                //             minimumFractionDigits: 2,
                //             maximumFractionDigits: 2
                //         }).format(penaltyAmount);
                //     },
                // },
                {
                    Header: 'Status',
                    accessor: 'isActive',
                    Cell: ({ value }: { value: boolean }) => {
                        switch (value) {
                            case true:
                                return <Chip color="warning" label="Not Returned" size="small" />;
                            case false:
                                return <Chip color="success" label="Returned" size="small" />;
                            default:
                                return <Chip color="success" label="Returned" size="small" />;
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
                                                setCustomer({ ...data });
                                                handleAdd();
                                            }}
                                            disabled={row.values?.isActive === false}
                                        >
                                            <EditTwoTone twoToneColor={row.values?.statusId === 2 ? theme.palette.secondary.main : theme.palette.primary.main} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Return">
                                        <IconButton
                                            color="primary"
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                let data: Bookstransfer = row.original;
                                                e.stopPropagation();
                                                setBookTransferId(data._id!)
                                                setBookId(data?.bookId!)
                                                setOpenAlert(true)

                                            }}
                                            disabled={row.values?.isActive === false}
                                        >
                                            <ReloadOutlined twoToneColor={row.values?.statusId === 2 ? theme.palette.secondary.main : theme.palette.primary.main} />
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

    //alert model
    const [openAlert, setOpenAlert] = useState(false);
    const [bookTransferId, setBookTransferId] = useState<string | null>(null)
    const [bookId, setBookId] = useState<string | null>(null)

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
    };


    // ----------------------- | API Call - Roles | ---------------------

    const { bookstransferList, error, isLoading, success } = useSelector(state => state.bookTransfer)

    useEffect(() => {
        dispatch(getBookstransfer(
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
        if (!bookstransferList) {
            setBookList([])
            return
        }
        if (bookstransferList == null) {
            setBookList([])
            return
        }
        setBookList(bookstransferList?.result!)
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
            <MainCard content={false}>
                <ScrollX>
                    <ReactTable columns={columns}
                        getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()}
                        data={bookList} handleAddEdit={handleAdd} />
                </ScrollX>
            </MainCard>
            {add &&
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
                    <AddEditTransfer booktransfer={customer} onCancel={handleAdd} />
                </Dialog>
            }
            {/* alert model */}
            {bookTransferId && bookId && <AlertBookDelete title={""} open={openAlert} handleClose={handleAlertClose} deleteId={bookTransferId} bookId={bookId} />}
        </>
    )
};

export default TransferBookList;
