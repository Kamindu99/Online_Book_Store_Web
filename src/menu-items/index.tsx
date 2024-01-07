// project import

// types
import { NavItemType } from 'types/menu';
import dashboard from './dashboard';
import hr from './hr';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [dashboard, hr]
};

export default menuItems;
