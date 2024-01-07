// material-ui
import { Typography } from '@mui/material';

// project import
import CustomerLists from 'sections/application/customer-management/customerlist';

// ================================|| USER RESTRICTON LIST ||================================ //
const CustomerList = () => (
  <Typography variant="body2">
    <CustomerLists />
  </Typography>
);

export default CustomerList;
