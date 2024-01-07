import { Column, HeaderGroup } from 'react-table';
//customer management-customer list
export interface dataProps {
  id?: number;
  name?: string;
  nic?: string;
  dob?: string;
  address?: string;
  email?: string;
  contactNumber?: string;
  agent?: string;
  subAgent?: string;
  status?: string;
}

export interface ReactTableProps {
  columns: Column[];
  data: dataProps[];
  getHeaderProps: (column: HeaderGroup) => {};
}
