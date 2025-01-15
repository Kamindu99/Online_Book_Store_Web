// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { SettingOutlined, PhoneOutlined } from '@ant-design/icons';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SettingOutlined, PhoneOutlined };

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
    },
    {
      id: 'contact-us',
      title: <FormattedMessage id="contact-us" />,
      type: 'item',
      url: '/home/contact-us',
      icon: icons.PhoneOutlined,
    }
  ]
};

export default application;
