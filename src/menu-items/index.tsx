// project import
import useAuth from 'hooks/useAuth';
import bookmanagement from './user-menu/book-management';
import home from './user-menu/home';
import bookmanagementAdmin from './admin-menu/book-management';
import homeAdmin from './admin-menu/home';

// types
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS ||============================== //


const MenuItems = (): { items: NavItemType[] } => {
  const { user } = useAuth();

  return {
    items: user?.email === 'kamidugayantha123@gmail.com' ? [homeAdmin, bookmanagementAdmin] : [home, bookmanagement]
  };
};

export default MenuItems;



