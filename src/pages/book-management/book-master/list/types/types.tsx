import { TableParamsType } from 'components/third-party/ReactTable';
import { Column, HeaderGroup } from 'react-table';
import { Books } from 'types/book-master';

export interface dataProps extends Books { }

export interface ReactTableProps {
    columns: Column[]
    data: dataProps[]
    handleAddEdit: () => void
    getHeaderProps: (column: HeaderGroup) => {};
    tableParams: TableParamsType
}
export interface TableHeaderProps {
    headerGroups: HeaderGroup[];
}

export interface userProps { }

