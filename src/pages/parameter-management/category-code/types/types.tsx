import { TableParamsType } from 'components/third-party/ReactTable';
import { Column, HeaderGroup } from 'react-table';
import { CategoryCodeDTO } from 'types/category-code';

export interface dataProps extends CategoryCodeDTO { }

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

