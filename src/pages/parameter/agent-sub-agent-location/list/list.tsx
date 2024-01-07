import { MouseEvent, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Button, Chip, Grid, Stack, Table, TableBody, TableCell, TableRow, Tooltip } from '@mui/material';

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
import { EyeTwoTone, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { TableProps } from './types/types';
import TableHeader from 'sections/parameter/agent-sub-agent-location/TableHeader';

// ==============================|| REACT TABLE FOR AGENT SUB AGENT LOCATION ||============================== //

function ReactTable({ columns, data, handleAddEdit, getHeaderProps }: TableProps) {
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
                <Stack >
                    <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAddEdit}>
                        Add New Location
                    </Button>
                </Stack>
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
    const data = useMemo(() => makeData(20), []);
    const [agentLocation, setAgentLocation] = useState(data);


    const columns = useMemo(
        () => [
            {
                Header: 'Location Code',
                accessor: 'locationcode'
            },
            {
                Header: 'Name',
                accessor: 'locationname'
            },
            {
                Header: 'Description',
                accessor: 'locationdesc'
            },
            {
                Header: 'Province',
                accessor: 'province'
            },
            {
                Header: 'District',
                accessor: 'desctrict'
            },
            {
                Header: 'Address',
                accessor: 'address'
            },
            {
                Header: 'E mail',
                accessor: 'email'
            },
            {
                Header: 'Contact No',
                accessor: 'contact'
            },
            {
                Header: 'Status',
                accessor: 'status',
                Cell: () => (
                    <Chip color="primary" label='Pending' size="small" variant="light" />
                )
            },
            {
                Header: 'Actions',
                disableSortBy: true,
                Cell: ({ row }: { row: Row }) => {
                    console.log(row);
                    console.log(agentLocation.id);
                    return (
                        <Stack direction="row">
                            <Tooltip title="View">
                                <IconButton
                                    color="secondary"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        setAgentLocation({
                                            locationcode: row.values.locationcode,
                                            locationname: row.values.locationname,
                                            locationdesc: row.values.locationdesc,
                                            province: row.values.province,
                                            desctrict: row.values.desctrict,
                                            address: row.values.address,
                                            email: row.values.email,
                                            contact: row.values.contact,
                                            status: row.values.status,
                                        })
                                        let agentLocation = row.values.id;
                                        console.log(agentLocation);

                                        navigation(`/parameter/agent-sub-agent-location/create-edit-view/view/${agentLocation}`)

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
    const handleAddEdit = () => {
        navigation(`/parameter/agent-sub-agent-location/create-edit-view/create/null`)
    }
    return (
        <Grid container>
            <Grid item xs={12}>
                <MainCard content={false}>
                    <ScrollX>
                        <ReactTable columns={columns} data={data} handleAddEdit={handleAddEdit} getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()} />
                    </ScrollX>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default List;
