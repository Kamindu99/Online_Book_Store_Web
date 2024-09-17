// material-ui
import { Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import EcommerceMetrix from "components/cards/statistics/EcommerceMetrix";

// project import
import {
    ScheduleFilled
} from '@ant-design/icons';
import { useEffect } from "react";
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
            <Grid container rowSpacing={4.5} columnSpacing={2.75}>
                {booksCount?.category?.map((item, index) => (
                    <Grid item xs={12} lg={4} sm={6}>
                        <EcommerceMetrix
                            primary={item.categoryName}
                            secondary={item.count?.toString()}
                            color={theme.palette.primary.main}
                            iconPrimary={ScheduleFilled}
                        />
                    </Grid>
                ))}
                {/* <Grid item xs={12} lg={4} sm={6}>
                    <EcommerceMetrix
                        primary="All Books"
                        secondary="100"
                        color={theme.palette.primary.main}
                        iconPrimary={ScheduleFilled}
                    />
                </Grid> */}
                {/* <Grid item xs={12} lg={4} sm={6}>
                    <EcommerceMetrix
                        primary="Disposed Books"
                        secondary="80"
                        color={theme.palette.warning.main}
                        iconPrimary={ScheduleFilled}
                    />
                </Grid>
                <Grid item xs={12} lg={4} sm={12}>
                    <EcommerceMetrix
                        primary="Available Books"
                        secondary="30"
                        color={theme.palette.success.main}
                        iconPrimary={ScheduleFilled}
                    />
                </Grid> */}
            </Grid>
        </>
    );
}

export default Dashboard;
