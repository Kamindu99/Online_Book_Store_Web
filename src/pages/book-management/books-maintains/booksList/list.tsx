import { MouseEvent, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Chip, Grid, Stack, Table, TableBody, TableCell, TableRow, Tooltip, Button } from '@mui/material';

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
import { EditTwoTone, DeleteTwoTone, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { TableProps } from './types/types';
import TableHeader from 'sections/book-management/books-maintains/TableHeader';
import AlertRoleDelete from 'sections/book-management/books-maintains/AlertRoleDelete';

// ==============================|| REACT TABLE FOR USER ROLE LIST ||============================== //

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
            Add
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
  const data = useMemo(() => makeData(2), []);
  const [user, setUser] = useState(data);


  const columns = useMemo(
    () => [
      {
        Header: 'Book ID',
        accessor: 'id',
        className: 'cell-center'
      },
      {
        Header: 'Book Name',
        accessor: 'rolenames'
      },
      {
        Header: 'Added Date',
        accessor: 'modulenames'
      },
      {
        Header: 'Status',
        Cell: () => (
          <Chip color="success" label='Active' size="small" variant="light" />
        )
      },
      {
        Header: 'Actions',
        disableSortBy: true,
        Cell: ({ row }: { row: Row }) => {
          console.log(row);
          return (
            <Stack direction="row">
              <Tooltip title="Edit">
                <IconButton
                  color="primary"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setUser({
                      id: row.values.id,
                      rolenames: row.values.rolenames,
                      modulenames: row.values.modulenames,

                    })
                    navigation(`/hr/user-management/role-creation/create-edit-view/edit/${row.values.id}`)
                  }}>
                  <EditTwoTone twoToneColor={theme.palette.primary.main} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton color="error"
                  onClick={(e: MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    setUser({
                      id: row.values.id,
                      rolenames: row.values.rolenames,
                      modulenames: row.values.modulenames,

                    })
                    setOpenAlert(true)
                  }}>
                  <DeleteTwoTone twoToneColor={theme.palette.error.main} />
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
    navigation(`/hr/user-management/role-creation/create-edit-view/create/null`)
  }

  //alert model
  const [openAlert, setOpenAlert] = useState(false);

  const handleAlertClose = () => {
    setOpenAlert(!openAlert);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <MainCard content={false}>
          <ScrollX>
            <ReactTable columns={columns} data={data} handleAddEdit={handleAddEdit} getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()} />
          </ScrollX>
          {user && <AlertRoleDelete title={user.rolenames || ""} open={openAlert} handleClose={handleAlertClose} deleteId={user.id!} />}
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default List;
