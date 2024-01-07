// Import Material-UI components
import { Button, Grid, Typography } from "@mui/material";

// Third-party imports
// (There are no third-party imports in this code)

// Project-specific imports
// (There are no project-specific imports in this code)

// Asset imports
import CustomerWrapper from "../../../../sections/customer/policy-flow/policy-categories/CustomerWrapper";

// Import the CSS styles
import { PolicyCategoryTypes, policyCategories } from "data/policy-dummy-data";
import { useNavigate } from "react-router";
import './policy-categories-styles.css';

// Define the interface for SquareCardProps
interface SquareCardProps {
    data?: PolicyCategoryTypes
}

// SquareButton component definition
const SquareButton = ({ data }: SquareCardProps) => {
    const navigate = useNavigate()

    const handleClick = (url: string) => {
        navigate(url)
    }
    return (
        <Grid item md={6} sm={6} xs={6} className="widget-container-item">
            <Button fullWidth className="square-button" onClick={() => handleClick(`/customer/policy-flow/categories/${data?.id}/sub-categories`)}>
                <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                    <Grid item sm={12}>
                        <Typography align="center" color="inherit" sx={{ fontWeight: "bold" }}>
                            {data?.title ? data.title : ""}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <Typography className="description" align="center" color="inherit" sx={{}}>
                            {data?.secondaryTitle ? data.secondaryTitle : ""}
                        </Typography>
                    </Grid>
                    <Grid item sm={12}>
                        <img src={data?.icon ? data.icon : '/'} alt="Icon" />
                    </Grid>
                </Grid>
            </Button>
        </Grid>
    );
}

// PolicyCategories component definition
const PolicyCategories = () => {
    return (
        <>
            <CustomerWrapper>
                <Grid container spacing={1} className="widget-container">
                    <Grid item xs={12}>
                        <Typography className="widget-container-title">Welcome to HNB General Insurance</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="widget-container-description">Insurance Polices For You</Typography>
                    </Grid>
                    {policyCategories ? policyCategories.map((item, index) => {
                        return <>
                            <SquareButton data={item} />
                        </>
                    }) : <>No Policy Categories ...</>}
                </Grid>
            </CustomerWrapper>
        </>
    );
}

export default PolicyCategories;
