import { useEffect, useMemo, useState } from 'react';

// material-ui
import {
    Chip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip
} from '@mui/material';

// third-party
import { Cell, Column, HeaderGroup, Row, useFilters, useGlobalFilter, usePagination, useTable } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { EmptyTable, TablePagination } from 'components/third-party/ReactTable';

// utils
import {
    DefaultColumnFilter,
    renderFilterTypes
} from 'utils/react-table';

// assets

// data

//types 


export interface dataProps {
    id?: number
    projectNo?: string
    startDate?: string
    inquiryId?: number
    wfId?: number
    statusId?: number
    workFlowObj?: {
        wfId?: number
        wfCode?: string
        wfLabel?: string
    }
    InquiryObj?: {
        inquiryId?: number
        InquiryNo?: string
    }
    statusObj?: {
        id?: number
        code?: string
        description?: string
    }
}

export interface ReactTableProps {
    columns: Column[]
    data: dataProps[]
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }: ReactTableProps) {
    const filterTypes = useMemo(() => renderFilterTypes, []);
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,

            initialState: { pageIndex: 0, pageSize: 10 }
        },
        useGlobalFilter,
        useFilters,
        usePagination
    );

    return (
        <>
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
                            <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}

// ==============================|| ProjectList ||============================== //

const ProjectList = () => {

    // table
    const [data, setData] = useState<dataProps[]>([])

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
                    Header: 'Project No',
                    accessor: 'projectNo',
                    Cell: ({ row }: { row: Row }) => {
                        if (row.values.projectNo === undefined || row.values.projectNo === null || row.values.projectNo === '') {
                            return <>-</>
                        }
                        if (typeof row.values.projectNo === 'string') {
                            return <>{row.values.projectNo}</>;
                        }
                        if (typeof row.values.projectNo === 'number') {
                            return <>{row.values.projectNo}</>;
                        }
                        if (typeof row.values.projectNo === 'object') {
                            return <> {row.values.projectNo.InquiryNo ? row.values.projectNo.InquiryNo : '-'}</>;
                        }
                        return <>-</>;
                    }
                },
                {
                    Header: 'Inquiry No',
                    accessor: 'InquiryObj',
                    Cell: ({ row }: { row: Row }) => {
                        if (row.values.InquiryObj === undefined || row.values.InquiryObj === null || row.values.InquiryObj === '') {
                            return <>-</>
                        }
                        if (typeof row.values.InquiryObj === 'string') {
                            return <>{row.values.InquiryObj}</>;
                        }
                        if (typeof row.values.InquiryObj === 'number') {
                            return <>{row.values.InquiryObj}</>;
                        }
                        if (typeof row.values.InquiryObj === 'object') {
                            return <> {row.values.InquiryObj.InquiryNo ? row.values.InquiryObj.InquiryNo : '-'}</>;
                        }
                        return <>-</>;
                    }
                },
                {
                    Header: 'Work Flow',
                    accessor: 'workFlowObj',
                    Cell: ({ row }: { row: Row }) => {
                        if (row.values.workFlowObj === undefined || row.values.workFlowObj === null || row.values.workFlowObj === '') {
                            return <>-</>
                        }
                        if (typeof row.values.workFlowObj === 'string') {
                            return <>{row.values.workFlowObj}</>;
                        }
                        if (typeof row.values.workFlowObj === 'number') {
                            return <>{row.values.workFlowObj}</>;
                        }
                        if (typeof row.values.workFlowObj === 'object') {
                            return <> {row.values.workFlowObj.wfLabel ? row.values.workFlowObj.wfLabel : '-'}</>;
                        }
                        return <>-</>;
                    }
                },
                {
                    Header: 'Start Date',
                    accessor: 'startDate',
                    Cell: ({ row }: { row: Row }) => {
                        if (row.values.startDate === undefined || row.values.startDate === null || row.values.startDate === '') {
                            return <>-</>
                        }
                        if (typeof row.values.startDate === 'string') {
                            return <>{row.values.startDate}</>;
                        }
                        if (typeof row.values.startDate === 'number') {
                            return <>{row.values.startDate}</>;
                        }
                        if (typeof row.values.startDate === 'object') {
                            return <> {row.values.startDate.description ? row.values.startDate.description : '-'}</>;
                        }
                        return <>-</>;
                    }
                },
                {
                    Header: 'Status',
                    accessor: 'statusObj',
                    Cell: ({ row }: { row: Row }) => {
                        if (row.values.statusObj === undefined || row.values.statusObj === null || row.values.statusObj === '') {
                            return <>-</>
                        }
                        if (typeof row.values.statusObj === 'string') {
                            return <>{row.values.statusObj}</>;
                        }
                        if (typeof row.values.statusObj === 'number') {
                            return <>{row.values.statusObj}</>;
                        }
                        if (typeof row.values.statusObj === 'object') {
                            switch (row.values.statusObj.description) {
                                case 'Pending':
                                    return <>
                                        <Tooltip title="Pending">
                                            <Chip color={'info'} label={row.values.statusObj.description ? row.values.statusObj.description : '-'} size="small" variant="light" />
                                        </Tooltip>
                                    </>
                                    break;
                                case 'Complete':
                                    return <>
                                        <Tooltip title="Complete">
                                            <Chip color={'success'} label={row.values.statusObj.description ? row.values.statusObj.description : '-'} size="small" variant="light" />
                                        </Tooltip>
                                    </>
                                    break;
                                default:
                                    return <>
                                        <Tooltip title="Default Chip">
                                            <Chip color={'warning'} label={row.values.statusObj.description ? row.values.statusObj.description : '-'} size="small" variant="light" />
                                        </Tooltip>
                                    </>
                                    break;
                            }
                        }
                        return <>-</>;
                    }
                }
            ] as Column[],
        []
    );

    useEffect(() => {
        setData([
            {
                id: 1,
                projectNo: "PROJECT-1",
                startDate: "22-03-2024",
                inquiryId: 4,
                wfId: 1,
                statusId: 1,
                workFlowObj: {
                    wfId: 1,
                    wfCode: "Inquiry Flow",
                    wfLabel: "INQ_7D_Normal_PROTO-DEV_A.MAT",
                },
                InquiryObj: {
                    inquiryId: 4,
                    InquiryNo: "E/2024/S1/E/D1/0004",
                },
                statusObj: {
                    id: 1,
                    code: "00",
                    description: "Pending",
                }
            }
        ] || [])
    }, [])

    return (
        <>
            <MainCard content={false}>
                <ScrollX>
                    <ReactTable columns={columns} data={data} />
                </ScrollX>
            </MainCard>
        </>
    );
}

export default ProjectList;
