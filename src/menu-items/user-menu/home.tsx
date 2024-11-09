// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined, CalendarOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { DashboardOutlined, CalendarOutlined };

// ==============================|| MENU ITEMS - Home ||============================== //

const home: NavItemType = {
    id: 'home',
    title: <FormattedMessage id="home" />,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'item',
            url: '/home/dashboard',
            icon: icons.DashboardOutlined,
        },
        {
            id: 'system-calendar',
            title: <FormattedMessage id="system-calendar" />,
            type: 'item',
            url: '/home/system-calendar',
            icon: icons.CalendarOutlined,
        }
    ]
};

export default home;
