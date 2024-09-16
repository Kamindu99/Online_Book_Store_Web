import { Column, HeaderGroup } from 'react-table';
import { Books } from 'types/book-master';

export interface dataProps extends Books {
    person?: string;
    transferDate?: string;
}

export interface ReactTableProps {
    columns: Column[]
    data: dataProps[]
    handleAddEdit: () => void
    getHeaderProps: (column: HeaderGroup) => {};
}
export interface TableHeaderProps {
    headerGroups: HeaderGroup[];
}

export interface userProps { }

