// material-ui
import { Chip, ChipProps, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { FallOutlined, RiseOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

interface Props {
    title: string;
    count: string;
    percentage?: number;
    isLoss?: boolean;
    color?: ChipProps['color'];
}

const AnalyticEcommerce = ({ color = 'primary', title, count, percentage, isLoss }: Props) => (
    <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
                {percentage && (
                    <Grid item>
                        <Chip
                            variant="combined"
                            color={color}
                            icon={
                                <>
                                    {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                                    {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                                </>
                            }
                            label={`${percentage}%`}
                            sx={{ ml: 1.25, pl: 1 }}
                            size="small"
                        />
                    </Grid>
                )}
            </Grid>
        </Stack>
    </MainCard>
);

export default AnalyticEcommerce;
