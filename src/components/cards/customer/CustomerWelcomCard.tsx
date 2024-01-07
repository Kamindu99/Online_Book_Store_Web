// material-ui
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// types
import { GenericCardProps } from 'types/root';

// import CustomerWelcomeCardBackground from '../../../assets/images/customer/CustomerBackground.svg';

// styles
const IconWrapper = styled('div')({
  position: 'absolute',
  left: '-17px',
  bottom: '-27px',
  color: '#fff',
  transform: 'rotate(25deg)',
  '& svg': {
    width: '100px',
    height: '100px',
    opacity: '0.35'
  }
});

interface CustomerCardCardProps {
  primary: string;
  secondary: string;
  iconPrimary: GenericCardProps['iconPrimary'];
  color: string;
}

// =============================|| Customer Welcome CARD ||============================= //

const CustomerWelcomeCard = ({ primary, secondary, iconPrimary, color }: CustomerCardCardProps) => {
  const IconPrimary = iconPrimary!;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

  return (
    <Card elevation={0} sx={{
      // backgroundImage: `url(${CustomerWelcomeCardBackground})`,
      backgroundSize: '100% 100%', 
      // background: color,
      position: 'relative',
      color: '#fff'
    }}>
      <CardContent>
        <IconWrapper>{primaryIcon}</IconWrapper>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
          <Grid item sm={12}>
            <Typography variant="h3" align="center" color="inherit">
              {secondary}
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Typography variant="body1" align="center" color="inherit">
              {primary}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomerWelcomeCard;
