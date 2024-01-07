import { dataProps } from 'pages/application/customer-management/list/types/customer-list-types';
import { customerViewDataProps } from 'pages/application/customer-management/view/types/customer-view-types';

//customer list dummy data

export const tableDataInit: dataProps[] = [
  {
    id: 1,
    name: 'Mr.Amal',
    nic: '123456789v',
    dob: '10/10/1990',
    address: '123/a, somewhere,Sri Lanka',
    email: 'someone@something.com',
    contactNumber: '0123456789',
    agent: 'A.someone',
    subAgent: 'someoneelse',
    status: 'pending'
  },
  {
    id: 2,
    name: 'Mr.Bimal',
    nic: '123456789v',
    dob: '10/10/1990',
    address: '123/a, somewhere,Sri Lanka',
    email: 'someone@something.com',
    contactNumber: '0123456789',
    agent: 'B.someone',
    subAgent: 'someoneelse',
    status: 'active'
  },
  {
    id: 3,
    name: 'Mr.chamal',
    nic: '123456789v',
    dob: '10/10/1990',
    address: '123/a, somewhere,Sri Lanka',
    email: 'someone@something.com',
    contactNumber: '0123456789',
    agent: 'C.someone',
    subAgent: 'someoneelse',
    status: 'rejected'
  },
  {
    id: 4,
    name: 'Mr.Dinul',
    nic: '123456789v',
    dob: '10/10/1990',
    address: '123/a, somewhere,Sri Lanka',
    email: 'someone@something.com',
    contactNumber: '0123456789',
    agent: 'D.someone',
    subAgent: 'someoneelse',
    status: 'hold'
  },
  {
    id: 5,
    name: 'Mr.Enrique',
    nic: '11111119v',
    dob: '10/10/1990',
    address: '123/a, somewhere,Sri Lanka',
    email: 'someone@something.com',
    contactNumber: '0123456789',
    agent: 'E.someone',
    subAgent: 'someoneelse',
    status: 'active'
  }
];

//customer view dummy data

export const customerData: readonly customerViewDataProps[] = [
  {
    firstName: 'Malindu',
    lastName: 'Mahesha',
    nic: '892980245V',
    dob: '10/10/1990',
    address: '123/a, somewhere,Sri Lanka',
    email: 'malindumahesha41@gmail.com',
    contactNumber: '0761979290',
    agent: 'A.someone',
    subAgent: 'someoneelse',
    status: 'pending'
  }
];
