// project import
import useAuth from 'hooks/useAuth';
import bookmanagement from './user-menu/book-management';
import home from './user-menu/home';
import bookmanagementAdmin from './admin-menu/book-management';
import homeAdmin from './admin-menu/home';
import bookmanagementguest from './guest-menu/book-management';
import homeguest from './guest-menu/home';

// types
import { NavItemType } from 'types/menu';
import paramatermanagement from './admin-menu/parameter-management';
import usermanagement from './admin-menu/user-management';
import application from './admin-menu/application';
import applicationUser from './user-menu/application';

// ==============================|| MENU ITEMS ||============================== //


const MenuItems = (): { items: NavItemType[] } => {
  const { user } = useAuth();

  return {
    items: user === null ? [homeguest, bookmanagementguest, application] : user?.email === 'wanigasinghebookcollection@gmail.com' ? [homeAdmin, bookmanagementAdmin, usermanagement, paramatermanagement, application] : [home, bookmanagement, applicationUser]
  };
};

export default MenuItems;



