// material-ui
import { Box, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import EcommerceMetrix from "components/cards/statistics/EcommerceMetrix";

// project import
import {
    ScheduleFilled
} from '@ant-design/icons';
import { useEffect } from "react";
import { useDispatch, useSelector } from "store";
import { getBooksCount } from "store/reducers/book-master";
import MainCard from "components/MainCard";
import InquiryStatusPieChart from "sections/dashboard/dashboard/InquiryStatusPieChart";
import AnalyticsDataCard from "components/cards/statistics/AnalyticsDataCard";

// ==============================|| Dashboard ||============================== //

const Dashboard = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const { booksCount, success } = useSelector(state => state.book)

    useEffect(() => {
        dispatch(getBooksCount());
    }, [dispatch, success,]);

    return (
        <>
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticsDataCard title="Total Users" count={booksCount?.totalUsers?.toString()!} children={undefined} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticsDataCard title="Total Books" count={booksCount?.totalBooks?.toString()!} isLoss color="warning" children={undefined} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticsDataCard title="Total Borrow" count={booksCount?.totalTransfers?.toString()!} isLoss color="warning" children={undefined} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <AnalyticsDataCard title="Total Loans" count="5" percentage={70.5} children={undefined} />
                </Grid>

                <Grid item xs={7} md={7} lg={7}>
                    <Grid item xs={12} lg={12} sm={12}>
                        <EcommerceMetrix
                            primary="All Books"
                            secondary={booksCount?.totalBooks?.toString()}
                            color={theme.palette.secondary.main}
                            iconPrimary={ScheduleFilled}
                            size="large"
                        />
                    </Grid>
                    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                        {booksCount?.category?.map((item, index) => (
                            <Grid item xs={4} lg={4} sm={4}>
                                <EcommerceMetrix
                                    primary={item.categoryName}
                                    secondary={item.count?.toString()}
                                    color={theme.palette.primary.darker}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={5} md={5} lg={5}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Books Overview</Typography>
                        </Grid>
                    </Grid>
                    <MainCard content={false} sx={{ mt: 2 }}>
                        {booksCount?.category && (
                            <Box sx={{ pt: 1 }}>
                                <InquiryStatusPieChart data={booksCount?.category!} />
                            </Box>
                        )}
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
}

export default Dashboard;
