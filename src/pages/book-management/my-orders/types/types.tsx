import { HeaderGroup } from 'react-table';
import { Booksorder } from 'types/book-order';

export interface dataProps extends Booksorder {
    userId?: string;
    transferDate?: string;
}
export interface TableHeaderProps {
    headerGroups: HeaderGroup[];
}

export interface userProps { }

