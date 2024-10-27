// project import
import useAuth from 'hooks/useAuth';
import bookmanagement from './user-menu/book-management';
import home from './user-menu/home';
import bookmanagementAdmin from './admin-menu/book-management';
import homeAdmin from './admin-menu/home';

// types
import { NavItemType } from 'types/menu';
import paramatermanagement from './admin-menu/parameter-management';

// ==============================|| MENU ITEMS ||============================== //


const MenuItems = (): { items: NavItemType[] } => {
  const { user } = useAuth();

  return {
    items: user?.email === 'wanigasinghebookcollection@gmail.com' ? [homeAdmin, bookmanagementAdmin, paramatermanagement] : [home, bookmanagement]
  };
};

export default MenuItems;



