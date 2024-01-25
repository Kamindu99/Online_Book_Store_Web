// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { TeamOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { TeamOutlined };

// ==============================|| MENU ITEMS - book-management ||============================== //

const bookmanagement: NavItemType = {
    id: 'book-management',
    title: <FormattedMessage id="book-management" />,
    type: 'group',
    children: [
        {
            id: 'list',
            title: <FormattedMessage id="list" />,
            type: 'item',
            url: '/book-management/list',
            icon: icons.TeamOutlined,
        }
    ]
};

export default bookmanagement;
