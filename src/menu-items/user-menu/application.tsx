// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { SettingOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SettingOutlined };
// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const application: NavItemType = {
  id: 'application',
  title: <FormattedMessage id="application" />,
  type: 'group',
  children: [
    {
      id: 'global-configuration',
      title: <FormattedMessage id="global-configuration" />,
      type: 'item',
      url: '/home/global-configuration/theme-settings',
      icon: icons.SettingOutlined,
    }
  ]
};

export default application;
