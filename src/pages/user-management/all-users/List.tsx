/* eslint-disable prettier/prettier */
import { Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';

// material ui
import {
    Chip,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';

import Avatar from 'components/@extended/Avatar';

// third-party
import { EmptyTable, HeaderSort, SortingSelect, TablePagination, TableParamsType, TableRowSelection } from 'components/third-party/ReactTable';
import { Cell, Column, HeaderGroup, Row, useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';

import {
    GlobalFilter,
    renderFilterTypes
} from 'utils/react-table';

// project import
import { StopOutlined, CheckOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import AlertUserInactive from 'sections/user-management/all-users/AlertUserInactive';
import { useDispatch, useSelector } from 'store';
import { toInitialState } from 'store/reducers/category-code';
import { openSnackbar } from 'store/reducers/snackbar';
import { getAllUsers } from 'store/reducers/users';
import { UserGetById, listParametersType } from 'types/users';
import { Loading } from 'utils/loading';
import { ReactTableProps, dataProps } from './types/types';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps, tableParams }: ReactTableProps) {
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
        state: { globalFilter, selectedRowIds, pageIndex },
        preGlobalFilteredRows,
        setGlobalFilter,
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

const UsersList = () => {

    const dispatch = useDispatch();
    const theme = useTheme();

    const [data, setData] = useState<dataProps[]>([]);


    //alert model
    const [openAlert, setOpenAlert] = useState(false);
    const [userId, setUserId] = useState<string | null>(null)
    const [title, setTitle] = useState<string | null>(null)

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
    };

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
                    Header: 'Full Name',
                    accessor: 'firstName',
                    Cell: ({ row }: { row: Row }) => {

                        const values: UserGetById = row?.original;
                        return (
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Avatar
                                    variant="rounded"
                                    alt={values.firstName}
                                    color="secondary"
                                    size="sm"
                                    src={values.profileImage!}
                                />
                                <Stack spacing={0}>
                                    <Typography variant="subtitle1"> {values.firstName} {values.lastName}</Typography>
                                </Stack>
                            </Stack>
                        );
                    }
                },
                {
                    Header: 'Registered Date',
                    accessor: 'createdDate',
                    Cell: ({ value }: { value: string }) => {
                        return value?.split('T')[0] ?? '-'
                    }
                },
                {
                    Header: 'Occupation',
                    accessor: 'occupation'
                },
                {
                    Header: 'Email',
                    accessor: 'email'
                },
                {
                    Header: 'Penalty',
                    accessor: 'penaltyAmount',
                    className: 'cell-right',
                    Cell: ({ value }) => {
                        return new Intl.NumberFormat('en-US', {
                            style: 'decimal',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }).format(value);
                    },
                },
                {
                    Header: 'Status',
                    accessor: 'isActive',
                    Cell: ({ value }: { value: boolean }) => {
                        switch (value) {
                            case true:
                                return <Chip color="success" label="Active" size="small" />;
                            case false:
                                return <Chip color="error" label="Inactive" size="small" />;
                            default:
                                return <Chip color="info" label="Active" size="small" />;
                        }
                    }
                },
                {
                    id: "actions",
                    Header: 'Actions',
                    accessor: 'actions',
                    Cell: ({ row }: { row: Row }) => {
                        return (
                            <>
                                <Stack direction="row" alignItems="" justifyContent="" spacing={0}>
                                    {row.values.isActive ? <Tooltip title="Inactive">
                                        <IconButton
                                            color="error"
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                let data: UserGetById = row.original;
                                                e.stopPropagation();
                                                setUserId(data._id!)
                                                setTitle("inactive")
                                                setOpenAlert(true)
                                            }}
                                        >
                                            <StopOutlined twoToneColor={theme.palette.error.main} />
                                        </IconButton>
                                    </Tooltip> : <Tooltip title="Active">
                                        <IconButton
                                            color="success"
                                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                                let data: UserGetById = row.original;
                                                e.stopPropagation();
                                                setUserId(data._id!)
                                                setTitle("active")
                                                setOpenAlert(true)
                                            }}
                                        >
                                            <CheckOutlined twoToneColor={theme.palette.error.main} />
                                        </IconButton>
                                    </Tooltip>}
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
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("_id");
    const [totalRecords, setTotalRecords] = useState<number>(0);

    const { usersList, error, isLoading, success } = useSelector((state) => state.users);

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
        dispatch(getAllUsers(listParameters));
    }, [dispatch, success, page, perPage, direction, sort]);

    useEffect(() => {
        if (!usersList) {
            setData([])
            return
        }
        if (usersList == null) {
            setData([])
            return
        }
        setData(usersList?.result!)
        setTotalRecords(usersList?.pagination?.total!)
    }, [usersList])

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
                    <ReactTable columns={columns} tableParams={tableParams}
                        getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()}
                        data={data!} />
                </ScrollX>
            </MainCard>
            {/* alert model for deactivate users in book store */}
            {userId && <AlertUserInactive title={title!} open={openAlert} handleClose={handleAlertClose} deleteId={userId} />}
        </>
    )
};

export default UsersList;
