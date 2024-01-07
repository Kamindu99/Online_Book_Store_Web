import { MouseEvent, useMemo, useState } from 'react';

// material-ui
import { Box, Chip, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, useTheme } from '@mui/material';

// third-party
import { Cell, Column, HeaderGroup, Row, useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { EmptyTable, HeaderSort, TablePagination } from 'components/third-party/ReactTable';

import { DefaultColumnFilter, GlobalFilter, renderFilterTypes } from 'utils/react-table';

// assets
import { EyeTwoTone } from '@ant-design/icons';

//types
import { tableDataInit } from 'data/customers';
import { ReactTableProps, dataProps } from '../../../pages/application/customer-management/list/types/customer-list-types';
//sections
import { useNavigate } from 'react-router';

//const
const dataInit: dataProps = {
  id: undefined,
  name: undefined,
  nic: undefined,
  dob: undefined,
  address: undefined,
  email: undefined,
  contactNumber: undefined,
  agent: undefined,
  subAgent: undefined,
  status: undefined
};

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, getHeaderProps }: ReactTableProps) {
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
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
        sortBy: [
          {
            id: 'id',
            desc: false
          }
        ]
      }
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ padding: 2 }}>
        <GlobalFilter preGlobalFilteredRows={preGlobalFilteredRows} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      </Stack>
      <Box sx={{ width: '100%', overflowX: 'auto', display: 'block' }}>
        <Table {...getTableProps()}>
          <TableHead sx={{ borderTopWidth: 2 }}>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
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
          </TableBody>
        </Table>
      </Box>
      <Box sx={{ p: 2, py: 1 }}>
        <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageIndex={pageIndex} pageSize={pageSize} />
      </Box>
    </>
  );
}

// ==============================|| List ||============================== //

const CustomerLists = () => {
  const theme = useTheme();
  const navigation = useNavigate();
  const [customer, setCustomer] = useState<dataProps>(dataInit);

  // table
  const [data] = useState<dataProps[]>(tableDataInit || []);

  const columns = useMemo(
    () =>
      [
        {
          Header: '#',
          accessor: 'id',
          className: 'cell-center',
          Cell: ({ row }: { row: Row }) => {
            if (row.id === undefined || row.id === null || row.id === '') {
              return <>-</>;
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
          Header: 'NIC',
          accessor: 'nic'
        },
        {
          Header: 'DOB',
          accessor: 'dob'
        },
        {
          Header: 'Address',
          accessor: 'address'
        },
        {
          Header: 'Email',
          accessor: 'email'
        },
        {
          Header: 'Contact NO.',
          accessor: 'contactNumber'
        },
        {
          Header: 'Agent',
          accessor: 'agent'
        },
        {
          Header: 'Sub Agent',
          accessor: 'subAgent'
        },
        {
          Header: 'Status',
          accessor: 'status',
          className: 'cell-center',
          Cell: ({ value }: { value: string }) => {
            switch (value) {
              case 'hold':
                return <Chip color="warning" label="Hold" size="small" variant="light" />;
              case 'active':
                return <Chip color="success" label="Active" size="small" variant="light" />;
              case 'rejected':
                return <Chip color="error" label="Rejected" size="small" variant="light" />;
              case 'pending':
              default:
                return <Chip color="info" label="Pending" size="small" variant="light" />;
            }
          }
        },
        {
          id: 'actions',
          Header: 'Actions',
          accessor: 'actions',
          className: 'cell-center',
          Cell: ({ row }: { row: Row }) => {
            console.log(row);

            return (
              <>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={0}>
                  <Tooltip title="View">
                    <IconButton
                      color="secondary"
                      onClick={(e: MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        setCustomer({
                          id: row.values.id,
                          name: row.values.name,
                          nic: row.values.nic,
                          dob: row.values.dob,
                          address: row.values.address,
                          email: row.values.email,
                          contactNumber: row.values.contactNumber,
                          agent: row.values.agent,
                          subAgent: row.values.subAgent,
                          status: row.values.status
                        });
                        console.log(customer);
                        navigation(`/application/customer-management/customers/customerView/view/${row.values.id}`);
                      }}
                    >
                      <EyeTwoTone twoToneColor={theme.palette.secondary.main} />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </>
            );
          }
        }
      ] as Column[],
    [navigation, theme.palette.secondary.main, customer]
  );

  return (
    <>
      <MainCard content={false}>
        <ScrollX>
          <ReactTable columns={columns} data={data} getHeaderProps={(column: HeaderGroup) => column.getSortByToggleProps()} />
        </ScrollX>
      </MainCard>
    </>
  );
};

export default CustomerLists;
