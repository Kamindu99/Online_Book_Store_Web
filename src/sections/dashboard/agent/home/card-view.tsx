// material-ui
import { Box, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';


// ==============================|| CARD VIEW FOR AGENT DASHBOARDS  ||============================== //

interface Props {
    title: string;
    count: string;
}

const CardView = ({ title, count }: Props) => (
    <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">{title}</Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">{count}</Typography>
                </Grid>
            </Grid>
        </Stack>
        <Box sx={{ pt: 2.25 }}>
        </Box>
    </MainCard>
);

export default CardView;
