import { Column, HeaderGroup } from 'react-table';

export interface dataProps {
    id?: number;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
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

