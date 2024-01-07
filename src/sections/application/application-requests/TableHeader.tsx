// material-ui
import { TableCell, TableRow, TableHead } from '@mui/material';

// third-party
import { HeaderSort } from 'components/third-party/ReactTable';
import { HeaderGroup } from 'react-table';

// project import
import { TableHeaderProps } from 'pages/application/application-requests/list/types/types';


// ==============================|| Application Requests - Table Header ||============================== //

const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups }) => {
  
  return (
    <TableHead sx={{ borderTopWidth: 2 }}>
      {headerGroups.map((headerGroup) => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: HeaderGroup) => (
                  <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
              <HeaderSort column={column} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
};

export default TableHeader;
