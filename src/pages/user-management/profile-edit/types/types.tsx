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

export interface dataProps extends UserRequestDto { }

export interface ReactTableProps {
    columns: Column[]
    data: dataProps[]
    handleAddEdit: () => void
}

export type UserRequestDto = {
    userId?: number;
    userName?: string;
    password?: string;
    rePassword?: string;
    description?: string;
    userStatus?: string;
    accountOptionLink?: boolean;
    accountOptionManual?: boolean;
    forceChangePassword?: boolean;
    generateOnetimePassword?: boolean;
    statusId?: number;
    userRoleId?: number;
    branchId?: number;
    departmentId?: number;
    email?: string;
    mobileNumber?: string;
    nic?: string;
    designation?: string;
    fullName?: string;
}





