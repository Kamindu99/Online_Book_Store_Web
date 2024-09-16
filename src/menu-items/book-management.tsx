// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { SyncOutlined, BookOutlined, BlockOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SyncOutlined, BookOutlined, BlockOutlined };

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
        // {
        //     id: 'disposal-list',
        //     title: <FormattedMessage id="disposal-list" />,
        //     type: 'item',
        //     url: '/book-management/book-disposal/list',
        //     icon: icons.BlockOutlined,
        // },
        {
            id: 'transfer-list',
            title: <FormattedMessage id="transfer-list" />,
            type: 'item',
            url: '/book-management/book-transfer/list',
            icon: icons.SyncOutlined,
        }
    ]
};

export default bookmanagement;
