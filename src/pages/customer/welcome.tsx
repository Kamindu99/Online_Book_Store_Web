import { useNavigate } from "react-router";

// material-ui
import { Button, Grid, Typography } from "@mui/material";

// third-party
import { ArrowRightOutlined } from "@ant-design/icons";

// project import
import CustomerWrapper from "sections/customer/CustomerWrapper";

// assets

//types 

// ==============================|| Welcome ||============================== //

const Welcome = () => {
    const navigate = useNavigate() 
    
    return (
        <>
            <CustomerWrapper>
                <Grid container spacing={3}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Typography align="center">Welcome Page</Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <Button fullWidth={true} variant="contained" startIcon={<ArrowRightOutlined />} onClick={() => { navigate(`/customer/policy-flow/categories`) }}>
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </CustomerWrapper>
        </>
    );
}

export default Welcome;
