// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { SyncOutlined, BookOutlined, BlockOutlined, ScanOutlined, PropertySafetyOutlined, FileMarkdownOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SyncOutlined, BookOutlined, BlockOutlined, ScanOutlined, PropertySafetyOutlined, FileMarkdownOutlined };

// ==============================|| MENU ITEMS - book-management ||============================== //

const paramatermanagement: NavItemType = {
    id: 'parameter-management',
    title: <FormattedMessage id="parameter-management" />,
    type: 'group',
    children: [
        {
            id: 'category-code',
            title: <FormattedMessage id="category-code" />,
            type: 'item',
            url: '/parameter-management/category-code',
            icon: icons.BookOutlined,
        },
    ]
};

export default paramatermanagement;