// material-ui

import { Grid } from "@mui/material";
import AnalyticEcommerce from "components/cards/statistics/AnalyticBooks";

// project import

// ==============================|| Dashboard ||============================== //

const Dashboard = () => (
    <>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Books" count="100" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Disposal" count="80" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Missing" count="20" isLoss color="warning" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Read" count="30" isLoss color="warning" />
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </Grid>
    </>
);

export default Dashboard;
