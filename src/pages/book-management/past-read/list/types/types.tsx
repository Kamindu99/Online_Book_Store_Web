import { Column, HeaderGroup } from 'react-table';
import { Books } from 'types/book-master';

export interface dataProps extends Books {
    userId?: string;
    transferedate?: string;
    returnDate?: string;
    bmBook?: Books
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

