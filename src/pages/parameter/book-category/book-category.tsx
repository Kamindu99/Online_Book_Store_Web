import { useCallback, useMemo, useState, FC, Fragment, MouseEvent } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
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
    Tooltip,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import {
    useFilters,
    useExpanded,
    useGlobalFilter,
    useRowSelect,
    useSortBy,
    useTable,
    usePagination,
    Column,
    HeaderGroup,
    Row,
    Cell,

} from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import IconButton from 'components/@extended/IconButton';
import { PopupTransition } from 'components/@extended/Transitions';
import {
    HeaderSort,
    SortingSelect,
    TablePagination,
    TableRowSelection
} from 'components/third-party/ReactTable';

import AddRegionalCenters from 'sections/parameter/AddRegionalCenters';
import RegionalCentersView from 'sections/parameter/RegionalCentersView';
import AlertRegionalCentersDelete from 'sections/parameter/AlertRegionalCentersDelete';

import makeData from 'data/react-table';
import { renderFilterTypes, GlobalFilter } from 'utils/react-table';

// assets
import { CloseOutlined, PlusOutlined, EyeTwoTone, EditTwoTone, DeleteTwoTone } from '@ant-design/icons';


// ==============================|| REACT TABLE ||============================== //

interface Props {
    columns: Column[];
    data: [];
    handleAdd: () => void;
    renderRowSubComponent: FC<any>;
    getHeaderProps: (column: HeaderGroup) => {};
}

function ReactTable({ columns, data, renderRowSubComponent, handleAdd, getHeaderProps }: Props) {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const filterTypes = useMemo(() => renderFilterTypes, []);
    const sortBy = { id: 'id', desc: false };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        allColumns,
        visibleColumns,
        rows,
        page,
        gotoPage,
        setPageSize,
        state: { globalFilter, selectedRowIds, pageIndex, pageSize, expanded },
        preGlobalFilteredRows,
        setGlobalFilter,
        setSortBy,
    } = useTable(
        {
            columns,
            data,
            filterTypes,
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
                        <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleAdd} size="small">
                            Add
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
                            const rowProps = row.getRowProps();

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
                                    {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns, expanded })}
                                </Fragment>
                            );
                        })}
                        <TableRow sx={{ '&:hover': { bgcolor: 'transparent !important' } }}>
                            <TableCell sx={{ p: 2, py: 3 }} colSpan={9}>
                                <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Stack>
        </>
    );
}

// ==============================|| RegionalCenters - LIST ||============================== //

const RegionalCentersListPage = () => {
    const theme = useTheme();

    const data = useMemo(() => makeData(5), []);
    const [open, setOpen] = useState<boolean>(false);
    const [RegionalCenters, setRegionalCenters] = useState<any>(null);
    const [RegionalCentersDeleteId, setRegionalCentersDeleteId] = useState<any>('');
    const [add, setAdd] = useState<boolean>(false);

    const handleAdd = () => {
        setAdd(!add);
        if (RegionalCenters && !add) setRegionalCenters(null);
    };

    const handleClose = () => {
        setOpen(!open);
    };

    const columns = useMemo(
        () => [

            {
                Header: 'Zonal Office ID',
                accessor: 'id',
                className: 'cell-center'
            },
            {
                Header: 'Zonal Office Code',
                accessor: 'age',
                className: 'cell-center'
            },
            {
                Header: 'Description',
                accessor: 'description',
                Cell: ({ row }: { row: Row }) => {
                    const { values } = row;
                    return (
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Typography variant="subtitle1">{values.description}</Typography>
                        </Stack>
                    );
                }
            },


            {
                Header: 'Status',
                accessor: 'status',
                Cell: ({ value }: { value: string }) => {
                    switch (value) {
                        case 'Reject':
                            return <Chip color="error" label="Reject" size="small" variant="light" />;
                        case 'Active':
                            return <Chip color="success" label="Active" size="small" variant="light" />;
                        case 'Pending':
                        default:
                            return <Chip color="info" label="Pending" size="small" variant="light" />;
                    }
                }
            },
            {
                Header: 'Actions',
                className: 'cell-center',
                disableSortBy: true,
                Cell: ({ row }: { row: Row<{}> }) => {
                    const collapseIcon = row.isExpanded ? (
                        <CloseOutlined style={{ color: theme.palette.error.main }} />
                    ) : (
                        <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
                    );
                    return (
                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                            <Tooltip title="View">
                                <IconButton
                                    color="secondary"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        row.toggleRowExpanded();
                                    }}
                                >
                                    {collapseIcon}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton
                                    color="primary"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        setRegionalCenters(row.values);
                                        handleAdd();
                                    }}
                                >
                                    <EditTwoTone twoToneColor={theme.palette.primary.main} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton
                                    color="error"
                                    onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                        e.stopPropagation();
                                        handleClose();
                                        setRegionalCentersDeleteId(row.values.id);
                                    }}
                                >
                                    <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    );
                }
            }
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [theme]
    );

    const renderRowSubComponent = useCallback(({ row }: { row: Row<{}> }) => <RegionalCentersView data={data[Number(row.id)]} />, [data]);

    return (
        <MainCard content={false}>
            <ScrollX>
                <ReactTable
                    columns={columns}
                    data={data}
                    handleAdd={handleAdd}
                    renderRowSubComponent={renderRowSubComponent}
                    getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()}
                />
            </ScrollX>
            <AlertRegionalCentersDelete title={RegionalCentersDeleteId} open={open} handleClose={handleClose} />
            {/* add RegionalCenters dialog */}
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
                <AddRegionalCenters RegionalCenters={RegionalCenters} onCancel={handleAdd} />
            </Dialog>
        </MainCard>
    );
};

export default RegionalCentersListPage;
