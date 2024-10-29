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
            id: 'master-list',
            title: <FormattedMessage id="master-list" />,
            type: 'item',
            url: '/book-management/book-master/list',
            icon: icons.BookOutlined,
        },
        {
            id: 'master-list-user',
            title: <FormattedMessage id="master-list" />,
            type: 'item',
            url: '/book-management/book-master/user-list',
            icon: icons.BookOutlined,
        },
        {
            id: 'Order List',
            title: <FormattedMessage id="Order List" />,
            type: 'item',
            url: '/book-management/pre-order/list',
            icon: icons.BookOutlined,
        },
        {
            id: 'My Order List',
            title: <FormattedMessage id="My Order List" />,
            type: 'item',
            url: '/book-management/pre-order/my-list',
            icon: icons.BookOutlined,
        },
        {
            id: 'disposal-list',
            title: <FormattedMessage id="disposal-list" />,
            type: 'item',
            url: '/book-management/book-disposal/list',
            icon: icons.BlockOutlined,
        },
        {
            id: 'transfer-list',
            title: <FormattedMessage id="transfer-list" />,
            type: 'item',
            url: '/book-management/book-transfer/list',
            icon: icons.SyncOutlined,
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
        },
        {
            id: 'User Details',
            title: <FormattedMessage id="User Details" />,
            type: 'item',
            url: '/book-management/qr-scan',
            icon: icons.ScanOutlined,
        }
    ]
};

export default bookmanagement;
