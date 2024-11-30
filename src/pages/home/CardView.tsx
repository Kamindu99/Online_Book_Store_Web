import { AuditOutlined } from '@ant-design/icons';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { BooksCount } from 'types/book-master';

export type SummaryDashboard = {
    totalNumberOfCIF?: number,
    numberOfJointPartners?: number,
    maximumNumberOfJointPartners?: number,
    jointPartnersDifference?: number,
    numberOfLoans?: number
}

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        transform: 'translateY(-5px)',
    },
}));

interface TableProps {
    scheduleSummaryDashboardData: BooksCount
}

function CardViews({ scheduleSummaryDashboardData }: TableProps) {

    const data = [
        {
            title: 'Total  Users',
            value: scheduleSummaryDashboardData?.totalUsers,
            icon: <AuditOutlined size={20} />,
            bgColor: 'linear-gradient(145deg, #e2d4f7 0%, #9f7bf7 100%)',
            color: 'white',
        },
        {
            title: 'Total  Books',
            value: scheduleSummaryDashboardData?.totalBooks,
            icon: <AuditOutlined size={20} />,
            bgColor: 'linear-gradient(145deg, #ffb3b3 0%, #ff8c94 100%)',
            color: 'white',
        },
        {
            title: 'Not Return',
            value: scheduleSummaryDashboardData?.totalTransfers,
            icon: <AuditOutlined size={20} />,
            bgColor: 'linear-gradient(145deg, #b3f0e6 0%, #7cd3a5 100%)',
            color: 'white',
        },
        {
            title: 'Pre Orders',
            value: scheduleSummaryDashboardData?.totalPreOrders,
            icon: <AuditOutlined size={20} />,
            bgColor: 'linear-gradient(145deg, #ffddc1 0%, #f7b2a3 100%)',
            color: 'white',
        }
    ];

    return (
        <Stack direction="row" spacing={0} mr={1}>
            <Grid container spacing={3}>
                {data.map((item, index) => (
                    <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                        <StyledCard sx={{ background: item.bgColor }}>
                            <CardContent sx={{ padding: '20px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                    <Box sx={{ padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: '50%' }}>
                                        {item.icon}
                                    </Box>
                                </Box>
                                <Typography
                                    variant="h5"
                                    color={"#323140"}
                                    textAlign="center"
                                    sx={{ fontWeight: 'bold', marginBottom: '5px', textShadow: '0 4px 7px rgba(255,255,255,0.7)' }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="h4"
                                    color={"#003366"}
                                    textAlign="center"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {item.value}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default CardViews;
