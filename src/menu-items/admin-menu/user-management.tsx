// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { UserOutlined, ScanOutlined, MailOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { UserOutlined, ScanOutlined, MailOutlined };

// ==============================|| MENU ITEMS - book-management ||============================== //

const usermanagement: NavItemType = {
    id: 'user-management',
    title: <FormattedMessage id="user-management" />,
    type: 'group',
    children: [
        {
            id: 'users-list',
            title: <FormattedMessage id="users-list" />,
            type: 'item',
            url: '/user-management/users-list',
            icon: icons.UserOutlined,
        },
        {
            id: 'User Details',
            title: <FormattedMessage id="User Details" />,
            type: 'item',
            url: '/user-management/qr-scan',
            icon: icons.ScanOutlined,
        },
        {
            id: 'Send Mail',
            title: <FormattedMessage id="Send Mail" />,
            type: 'item',
            url: '/user-management/send-mail',
            icon: icons.MailOutlined,
        }
    ]
};

export default usermanagement;
