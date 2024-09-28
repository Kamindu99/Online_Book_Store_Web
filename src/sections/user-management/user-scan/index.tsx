import { useState } from 'react';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project imports
import { AlignCenterOutlined } from '@ant-design/icons';
import MainCard from 'components/MainCard';
import AllBorrowBooksList from './AllBorrowBooks';
import DueBorrowBooksList from './DueBorrowBooks';

// tab labels
const tabs = ['Borrow Books', 'Past Read Books'];

const getTabContent = (
    tabIndex: number,
    userId: string,
) => {
    switch (tabIndex) {
        case 0:
            return (
                <DueBorrowBooksList userId={userId} />
            );
        case 1:
            return (
                <AllBorrowBooksList userId={userId} />
            );
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| Customer Forms WIZARD - VALIDATION with Tabs ||============================== //

const CustomerFormWizard = ({ userId }: { userId: string }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <>
            <MainCard >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="customer form tabs">
                        {tabs.map((label, index) => (
                            <Tab label={label} key={index} icon={<AlignCenterOutlined />} iconPosition="start"
                                sx={{ backgroundColor: activeTab === index ? '#f0f2f5' : 'transparent' }}
                            />
                        ))}
                    </Tabs>
                </Box>
                <Box sx={{ p: 3 }}>
                    {getTabContent(activeTab, userId)}
                </Box>
            </MainCard>
        </>
    );
};

export default CustomerFormWizard;
