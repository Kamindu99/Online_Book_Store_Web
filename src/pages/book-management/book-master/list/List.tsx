/* eslint-disable prettier/prettier */
import { Fragment, useMemo, useState } from 'react';

// material ui
import {
    Button,
    Chip,
    Dialog,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    alpha,
    useMediaQuery,
    useTheme
} from '@mui/material';

// third-party
import { PopupTransition } from 'components/@extended/Transitions';
import { HeaderSort, SortingSelect, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';
import { Cell, Column, HeaderGroup, Row, useExpanded, useFilters, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';

import {
    GlobalFilter,
    renderFilterTypes
} from 'utils/react-table';

// project import
import { PlusOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import AddEditBook from 'sections/book-management/book-master/AddEditBook';
import { ReactTableProps, dataProps } from './types/types';

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
                        {page.map((row: Row, i: number) => {
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
                        })}
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

    const bookdata: dataProps[] = ([
        {
            id: 1,
            name: 'Madol Duwa',
            price: 'Rs. 250.00',
            author: 'Martin Wickramasinghe',
            addedDate: '2023-09-01',
            status: 'Active'
        },
        {
            id: 2,
            name: 'Nidhanaya',
            price: 'Rs. 320.00',
            author: 'J.B. Disanayake',
            addedDate: '2024-01-05',
            status: 'Active'
        },
        {
            id: 3,
            name: 'Gehenu Lamai',
            price: 'Rs. 200.00',
            author: 'Karunasena Jayalath',
            addedDate: '2021-05-01',
            status: 'Active'
        },
        {
            id: 4,
            name: 'Sulanga Wage Avidin',
            price: 'Rs. 430.00',
            author: 'Sujeeva Prasannaarachchi',
            addedDate: '2022-09-01',
            status: 'Active'
        }
    ])

    const [customer, setCustomer] = useState<any>(null);
    const [add, setAdd] = useState<boolean>(false);

    const handleAdd = () => {
        setAdd(!add);
        if (customer && !add) setCustomer([]);
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
                    Header: 'Name',
                    accessor: 'name'
                },
                {
                    Header: 'Author',
                    accessor: 'author'
                },
                {
                    Header: 'Price',
                    accessor: 'price'
                },
                {
                    Header: 'Added Date',
                    accessor: 'addedDate'
                },
                {
                    Header: 'Status',
                    accessor: 'status',
                    Cell: ({ value }: { value: string }) => {
                        switch (value) {
                            case 'Active':
                                return <Chip color="error" label="Active" size="small" variant="light" />;
                            case 'Disposed':
                                return <Chip color="success" label="Disposed" size="small" variant="light" />;
                            default:
                                return <Chip color="info" label="Active" size="small" variant="light" />;
                        }
                    }
                }
            ] as Column[],
        []
    );

    return (
        <>
            <MainCard content={false}>
                <ScrollX>
                    <ReactTable columns={columns}
                        getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()}
                        data={bookdata} handleAddEdit={handleAdd} />
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
                <AddEditBook customer={customer} onCancel={handleAdd} />
            </Dialog>
        </>
    )
};

export default List;
