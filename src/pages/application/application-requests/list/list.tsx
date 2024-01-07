import { MouseEvent, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Chip, Grid, Stack, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

// third-party
import {
    useSortBy,
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination,
    HeaderGroup,
    Row,
    Cell
} from 'react-table';

import { GlobalFilter } from 'utils/react-table';

// project import
import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { TablePagination, EmptyTable } from 'components/third-party/ReactTable';
import IconButton from 'components/@extended/IconButton';
import { EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { TableProps } from './types/types';
import TableHeader from 'sections/book-management/books-maintains/TableHeader';

// ==============================|| REACT TABLE FOR USER ROLE LIST ||============================== //

function ReactTable({ columns, data, getHeaderProps }: TableProps) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        prepareRow,
        gotoPage,
        setPageSize,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            getHeaderProps,
            initialState: { pageIndex: 0, pageSize: 10 },
            sortBy: [
                {
                    id: 'id',
                    desc: false
                }
            ]
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useFilters
    );

    const sortingRow = rows.slice(0, 9);
    let sortedData = sortingRow.map((d: Row) => d.original);
    Object.keys(sortedData).forEach((key: string) => sortedData[Number(key)] === undefined && delete sortedData[Number(key)]);

    return (

        <Stack >
            <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ padding: 2 }}>
                <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
            </Stack>


            <Table {...getTableProps()}>

                <TableHeader headerGroups={headerGroups} />

                <TableBody {...getTableBodyProps()}>
                    {page.length > 0 ? (

                        page.map((row: Row) => {
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
                            <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>

        </Stack>

    );
}

const List = () => {

    const theme = useTheme();
    const navigation = useNavigate();
    const data = useMemo(() => makeData(200), []);
    const [user, setUser] = useState(data);


    const columns = useMemo(
        () => [
            {
                Header: 'Request No',
                accessor: 'id'
            },
            {
                Header: 'Data / Time',
                accessor: 'date'
            },
            {
                Header: 'Agent',
                accessor: 'firstName'
            },
            {
                Header: 'Sub Agent',
                accessor: 'lastName'
            },
            {
                Header: 'Location',
                accessor: 'country'
            },
            {
                Header: 'Policy Type',
                accessor: 'policytype'
            },
            {
                Header: 'Product',
                accessor: 'product'
            },
            {
                Header: 'Request Status',
                accessor: 'requeststatus',
                Cell: () => (
                    <Chip color="primary" label='Policy Issued' size="small" variant="light" />

                )
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: () => (
                    <Chip color="warning" label='Hold' size="small" variant="light" />
                )
            },
            {
                Header: 'Actions',
                disableSortBy: true,
                Cell: ({ row }: { row: Row }) => {
                    console.log(row);
                    console.log(user.id);
                    return (
                        <Stack direction="row">
                            <Tooltip title="View">
                                <IconButton
                                    color="secondary"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        setUser({
                                            id: row.values.id,
                                            date: row.values.date,
                                            agent: row.values.firstName,
                                            subagent: row.values.lastName,
                                            location: row.values.country,
                                            policytype: row.values.policytype,
                                            product: row.values.product,
                                            requeststatus: row.values.requeststatus,
                                            status: row.values.status,
                                        })
                                        let user = row.values.id;
                                        console.log(user);

                                        navigation(`/application/application-requests/create-edit-view/view/${user}`)

                                    }}
                                >
                                    <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
                                </IconButton>
                            </Tooltip>

                        </Stack>
                    );
                }
            }
        ],
        [theme]
    );

    return (
        <Grid container>
            <Grid item xs={12}>
                <MainCard content={false}>
                    <ScrollX>
                        <ReactTable columns={columns} data={data} getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()} />
                    </ScrollX>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default List;
