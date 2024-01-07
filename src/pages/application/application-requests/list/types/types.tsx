import { Column } from 'react-table';
import { HeaderGroup } from 'react-table';

export interface TableProps {
    columns: Column[];
    data: [];
    getHeaderProps: (column: HeaderGroup) => {};

}

export interface TableHeaderProps {
    headerGroups: HeaderGroup[];

}

