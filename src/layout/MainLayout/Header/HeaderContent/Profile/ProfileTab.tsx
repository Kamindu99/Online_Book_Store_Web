import { useEffect, useState } from 'react';

// material-ui
import { Link, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, LockOutlined, LogoutOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

interface Props {
  handleLogout: () => void;
}

const ProfileTab = ({ handleLogout }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const path = window.location.pathname;
    switch (path) {
      case '/user-management/view-profile':
        setSelectedIndex(0);
        break;
      case '/user-management/edit-profile':
        setSelectedIndex(1);
        break;
      case '/user-management/password-change':
        setSelectedIndex(2);
        break;
      case '/book-management/favourite':
        setSelectedIndex(3);
        break;
      default:
        setSelectedIndex(0);
    }
  }, []);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <Link style={{ textDecoration: 'none', color: 'black' }} href="/user-management/view-profile">
        <ListItemButton selected={selectedIndex === 0} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <UserOutlined />
          </ListItemIcon>
          <ListItemText primary="View Profile" />
        </ListItemButton>
      </Link>
      <Link style={{ textDecoration: 'none', color: 'black' }} href="/user-management/edit-profile">
        <ListItemButton selected={selectedIndex === 1} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <EditOutlined />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>
      </Link>
      <Link style={{ textDecoration: 'none', color: 'black' }} href="/user-management/password-change">
        <ListItemButton selected={selectedIndex === 2} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 2)}>
          <ListItemIcon>
            <LockOutlined />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItemButton>
      </Link>
      <Link style={{ textDecoration: 'none', color: 'black' }} href="/book-management/favourite">
        <ListItemButton selected={selectedIndex === 3} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 3)}>
          <ListItemIcon>
            <HeartOutlined />
          </ListItemIcon>
          <ListItemText primary="Favourite" />
        </ListItemButton>
      </Link>
      <ListItemButton selected={selectedIndex === 4} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;
