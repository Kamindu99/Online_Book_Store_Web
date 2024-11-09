import { useMemo, useState } from 'react';

// material-ui
import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';

// third-party
import { Cell, Column, HeaderGroup, Row, useFilters, useGlobalFilter, usePagination, useTable } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { EmptyTable, TablePagination, TableParamsType } from 'components/third-party/ReactTable';

// utils
import {
    DefaultColumnFilter,
    GlobalFilter,
    renderFilterTypes
} from 'utils/react-table';

// assets

//types 

interface dataProps {
    id?: number
    dayId?: number
    code?: string
    description?: string
    isActive?: boolean
}

interface ReactTableProps {
    columns: Column[]
    data: dataProps[]
    tableParams: TableParamsType
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, tableParams }: ReactTableProps) {
    const filterTypes = useMemo(() => renderFilterTypes, []);
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preGlobalFilteredRows,
        setGlobalFilter,
        globalFilter,
        page,
        state: { pageIndex }
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,

            //change this
            initialState: { pageIndex: tableParams?.page, pageSize: tableParams?.perPage },
            manualPagination: true,
            pageCount: tableParams?.pageCount,
        },
        useGlobalFilter,
        useFilters,
        usePagination
    );

    return (
        <>
            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ padding: 2 }}>
                <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
                <Stack direction="row" alignItems="center" spacing={1}>


                </Stack>
            </Stack>

            <Table {...getTableProps()}>
                <TableHead sx={{ borderTopWidth: 2 }}>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column: HeaderGroup) => (
                                <TableCell {...column.getHeaderProps([{ className: column.className }])}>{column.render('Header')}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {page.length > 0 ? (
                        page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map((cell: Cell) => (
                                        <TableCell {...cell.getCellProps([{ className: cell.column.className }])}>{cell.render('Cell')}</TableCell>
                                    ))}
                                </TableRow>
                            );
                        })
                    ) : (
                        <EmptyTable msg="No Data" colSpan={12} />
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
        </>
    );
}
// ==============================|| List ||============================== //

interface ListProps {
    data: dataProps[]
}


const List = ({ data }: ListProps) => {

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
                    Header: 'Date',
                    accessor: 'holidayDate',
                    Cell: ({ row }: { row: Row }) => {
                        if (row.values.holidayDate === undefined || row.values.holidayDate === null || row.values.holidayDate === '') {
                            return <>-</>
                        }
                        if (typeof row.values.holidayDate === 'string') {
                            return <>{row.values.holidayDate}</>;
                        }
                        if (typeof row.values.holidayDate === 'number') {
                            return <>{row.values.holidayDate}</>;
                        }
                        // Handle any other data types if necessary
                        return <>-</>;
                    }
                },
                {
                    Header: 'Reason',
                    accessor: 'reason',
                    Cell: ({ row }: { row: Row }) => {
                        if (row.values.reason === undefined || row.values.reason === null || row.values.reason === '') {
                            return <>-</>
                        }
                        if (typeof row.values.reason === 'string') {
                            return <>{row.values.reason}</>;
                        }
                        if (typeof row.values.reason === 'number') {
                            return <>{row.values.reason}</>;
                        }
                        // Handle any other data types if necessary
                        return <>-</>;
                    }
                }
            ] as Column[],
        []
    );

    //========================================================API CONFIG=====================================================//

    const [page, setPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(1000);
    const [direction, setDirection] = useState<"asc" | "desc">("desc");
    const [search, setSearch] = useState<string>("");
    const [sort, setSort] = useState<string>("dayId");

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
        pageCount: data.length > 0 ? Math.ceil(data.length / perPage) : 0
    }

    return (
        <>
            <MainCard content={false}>
                <ScrollX>
                    <ReactTable columns={columns} data={data} tableParams={tableParams} />
                </ScrollX>
            </MainCard>
        </>
    );
}

export default List;
