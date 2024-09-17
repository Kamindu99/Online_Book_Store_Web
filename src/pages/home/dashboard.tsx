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
                <Grid item xs={12} lg={12} sm={12}>
                    <EcommerceMetrix
                        primary="All Books"
                        secondary={booksCount?.totalBooks?.toString()}
                        color={theme.palette.secondary.main}
                        iconPrimary={ScheduleFilled}
                        size="large"
                    />
                </Grid>
                {booksCount?.category?.map((item, index) => (
                    <Grid item xs={12} lg={3} sm={6}>
                        <EcommerceMetrix
                            primary={item.categoryName}
                            secondary={item.count?.toString()}
                            color={theme.palette.primary.darker}
                            iconPrimary={ScheduleFilled}
                        />
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

export default Dashboard;
