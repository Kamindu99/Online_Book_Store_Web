// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { SyncOutlined, BookOutlined, BlockOutlined, ScanOutlined, PropertySafetyOutlined, FileMarkdownOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SyncOutlined, BookOutlined, BlockOutlined, ScanOutlined, PropertySafetyOutlined, FileMarkdownOutlined };

// ==============================|| MENU ITEMS - book-management ||============================== //

const bookmanagement: NavItemType = {
    id: 'book-management',
    title: <FormattedMessage id="book-management" />,
    type: 'group',
    children: [
        {
            id: 'master-list-user',
            title: <FormattedMessage id="master-list-user" />,
            type: 'item',
            url: '/book-management/book-master/user-list',
            icon: icons.BookOutlined,
        }
    ]
};

export default bookmanagement;
