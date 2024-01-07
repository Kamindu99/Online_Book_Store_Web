// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { UserOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { UserOutlined };

// ==============================|| MENU ITEMS - hr ||============================== //

const hr: NavItemType = {
  id: 'hr',
  title: <FormattedMessage id="hr" />,
  type: 'group',
  children: [
    {
      id: 'library-management',
      title: <FormattedMessage id="library-management" />,
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'role-creation',
          title: <FormattedMessage id="role-creation" />,
          type: 'item',
          url: '/books-management/books/books-list'
        },
        {
          id: 'para-creation',
          title: <FormattedMessage id="para-creation" />,
          type: 'item',
          url: '/books-management/books/parameter'
        }
      ]
    }
  ]
};

export default hr;
