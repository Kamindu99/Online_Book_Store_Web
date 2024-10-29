import { Column, HeaderGroup } from 'react-table';
import { Books } from 'types/book-master';

export interface dataProps extends Books {
    userId?: string;
    transferDate?: string;
}

export interface ReactTableProps {
    columns: Column[]
    data: dataProps[]
    getHeaderProps: (column: HeaderGroup) => {};
}
export interface TableHeaderProps {
    headerGroups: HeaderGroup[];
}

export interface userProps { }

