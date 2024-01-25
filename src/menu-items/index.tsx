// project import
import bookmanagement from './book-management';
import home from './home';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  items: [home, bookmanagement]
};

export default menuItems;
