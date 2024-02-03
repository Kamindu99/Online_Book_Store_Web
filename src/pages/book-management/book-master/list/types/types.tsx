import { Column, HeaderGroup } from 'react-table';

export interface dataProps {
    bookId?: number;
    bookName?: string;
    author?: string;
    price?: string;
    addedDate?: string;
    statusId?: number;
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

