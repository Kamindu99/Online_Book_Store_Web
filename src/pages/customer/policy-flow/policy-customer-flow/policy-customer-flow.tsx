import { useState } from 'react';

// material-ui
import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography } from '@mui/material';

// project import
import CustomerWrapper from "sections/customer/CustomerWrapper";
import PolicyCustomerFlowSection from "sections/customer/policy-flow/policy-customer-flow/policy-customer-flow";

// ==============================|| Policy-Customer-Flow ||============================== //

const PolicyCustomerFlow = () => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <> 
            <CustomerWrapper>
                <Grid container spacing={3}>
                    <Grid item md={12} sm={12} xs={12} sx={{ mb: 3 }}>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ mt: 0 }}>
                            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                <Typography variant="subtitle1">Policy Overview</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" >
                                    <Typography variant="subtitle1">Policy Name : <Typography variant="h6" color="secondary" gutterBottom>Motor Third Party Insurance</Typography></Typography>
                                    <Typography variant="subtitle1">Vehicle Type : <Typography variant="h6" color="secondary" gutterBottom>Motor Cycle</Typography></Typography>
                                    <Typography variant="subtitle1">Policy Duration : <Typography variant="h6" color="secondary" gutterBottom>12 Months</Typography></Typography>
                                </Typography>
                                <Divider />
                                <Typography variant="subtitle1" sx={{ mt: 3 }}>Premium LKR 707.46</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <PolicyCustomerFlowSection />
                    </Grid>
                </Grid>
            </CustomerWrapper>
        </>
    );
}

export default PolicyCustomerFlow;
