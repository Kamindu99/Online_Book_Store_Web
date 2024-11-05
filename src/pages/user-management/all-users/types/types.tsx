import { TableParamsType } from 'components/third-party/ReactTable';
import { Column, HeaderGroup } from 'react-table';
import { Users } from 'types/users';

export interface dataProps extends Users { }

export interface ReactTableProps {
    columns: Column[]
    data: dataProps[]
    getHeaderProps: (column: HeaderGroup) => {};
    tableParams: TableParamsType
}
export interface TableHeaderProps {
    headerGroups: HeaderGroup[];
}

export interface userProps { }

