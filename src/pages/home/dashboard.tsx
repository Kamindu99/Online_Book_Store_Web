// material-ui
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

// project import
import AnalyticsDataCard from "components/cards/statistics/AnalyticsDataCard";
import MainCard from "components/MainCard";
import { useEffect } from "react";
import InquiryStatusPieChart from "sections/home/dashboard/dashboard/InquiryStatusPieChart";
import { useDispatch, useSelector } from "store";
import { getBooksCount } from "store/reducers/book-master";

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
            <Grid container rowSpacing={1.5} columnSpacing={2.75}>
                <Grid item xs={6} sm={6} md={3} lg={3}>
                    <AnalyticsDataCard title="Total Users" count={booksCount?.totalUsers?.toString()!} children={undefined} />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3}>
                    <AnalyticsDataCard title="Total Books" count={booksCount?.totalBooks?.toString()!} isLoss color="warning" children={undefined} />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3}>
                    <AnalyticsDataCard title="Not Return" count={booksCount?.totalTransfers?.toString()!} isLoss color="warning" children={undefined} />
                </Grid>
                <Grid item xs={6} sm={6} md={3} lg={3}>
                    <AnalyticsDataCard title="Pre Orders" count={booksCount?.totalPreOrders?.toString()!} isLoss color="warning" children={undefined} />
                </Grid>

                <Grid item xs={12} md={7} lg={7}>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Category Wise Books</Typography>
                        </Grid>
                    </Grid>
                    <MainCard content={false} sx={{ mt: 2 }}>
                        <Grid item xs={12} lg={12} sm={12} >
                            <Card sx={{ background: theme.palette.primary.lighter, borderRadius: 0 }}>
                                <CardContent>
                                    <Typography variant="h4" component="h2">
                                        Total Books - {booksCount?.totalBooks} Books
                                    </Typography>

                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid container rowSpacing={4.5} columnSpacing={1.5} p={1.5}>
                            {booksCount?.category?.map((item, index) => (
                                <Grid item xs={6} lg={3} sm={3}>
                                    <Card sx={{ background: '#162d78' }}>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" color={'white'}>
                                                {item.categoryName}
                                            </Typography>
                                            <Typography variant="body1" color="#b5b5b5" component="p">
                                                {item.count} Books
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </MainCard>
                </Grid>
                <Grid item xs={12} md={5} lg={5}>
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
