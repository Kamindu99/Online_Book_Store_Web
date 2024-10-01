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
            title: <FormattedMessage id="master-list" />,
            type: 'item',
            url: '/book-management/book-master/user-list',
            icon: icons.BookOutlined,
        },
        {
            id: 'my-transfer-list',
            title: <FormattedMessage id="my-transfer-list" />,
            type: 'item',
            url: '/book-management/my-book-transfer/list',
            icon: icons.FileMarkdownOutlined,
        },
        {
            id: 'past-read-list',
            title: <FormattedMessage id="past-read-list" />,
            type: 'item',
            url: '/book-management/past-read-books/list',
            icon: icons.PropertySafetyOutlined,
        }
    ]
};

export default bookmanagement;
