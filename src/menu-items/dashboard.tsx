// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { DashboardOutlined };

// ==============================|| MENU ITEMS - dashboard ||============================== //

const dashboard: NavItemType = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    type: 'group',
    children: [
        {
            id: 'dashboard-admin',
            title: <FormattedMessage id="dashboard-admin" />,
            type: 'collapse',
            icon: icons.DashboardOutlined,
            children: [
                {
                    id: 'home',
                    title: <FormattedMessage id="home" />,
                    type: 'item',
                    url: '/dashboard/admin'
                }
            ]
        }
    ]
};

export default dashboard;
