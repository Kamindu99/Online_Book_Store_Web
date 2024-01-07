// material-ui
import { Box } from '@mui/material';
import { Theme } from '@mui/material/styles';

// project import
import MainCard, { MainCardProps } from 'components/MainCard';

// ==============================|| CUSTOMER - CARD WRAPPER ||============================== //

const CustomerCard = ({ children, ...other }: MainCardProps) => (
  <MainCard
    sx={{
      background: "transparent",
      // maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={false}
    {...other}
    border={false}
    boxShadow={false}
    shadow={(theme: Theme) => theme.customShadows.z1}
  >
    <Box sx={{
      p: {
        xs: 2,
        sm: 3,
        md: 4,
        xl: 5
      }
    }}>{children}</Box>
  </MainCard>
);

export default CustomerCard;
