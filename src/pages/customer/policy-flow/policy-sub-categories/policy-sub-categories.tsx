// Import Material-UI components
import { Button, Grid, Typography } from "@mui/material";

// Third-party imports
// (There are no third-party imports in this code)

// Project-specific imports
import CustomerWrapper from "../../../../sections/customer/policy-flow/policy-sub-categories/CustomerWrapper";

// Asset imports

// Import the CSS styles
import { PolicySubCategoryTypes, policySubCategories } from "data/policy-dummy-data";
import { useNavigate, useParams } from "react-router";
import './policy-sub-categories-styles.css';

// Define the interface for SquareCardProps
interface SquareCardProps {
    data?: PolicySubCategoryTypes

}

// SquareButton component definition
const SquareButton = ({ data }: SquareCardProps) => {
    const { policyCategoryId } = useParams();
    const navigate = useNavigate()

    const handleClick = (url: string) => {
        navigate(url)
    }
    return (
        <Grid item md={6} sm={6} xs={6} className="widget-container-item">
            <Button fullWidth className="square-button" onClick={() => handleClick(`/customer/policy-flow/categories/${policyCategoryId}/sub-categories/${data?.id}/customer-flow`)}>
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

// PolicySubCategories component definition
const PolicySubCategories = () => {
    return (
        <>
            <CustomerWrapper>
                <Grid container spacing={1} className="widget-container">
                    <Grid item xs={12}>
                        <Typography className="widget-container-title">Motor Third Party Insurance</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="widget-container-description"></Typography>
                    </Grid>
                    {policySubCategories ? policySubCategories.map((item, index) => {
                        return <>
                            <SquareButton data={item} />
                        </>
                    }) : <>No Policy Sub Categories ...</>}
                </Grid>
            </CustomerWrapper>
        </>
    );
}

export default PolicySubCategories;
