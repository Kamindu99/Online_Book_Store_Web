// material-ui
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// types
import { ThemeDirection } from 'types/config';

// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: 'absolute',
        filter: 'blur(14px)',
        zIndex: -1,
        bottom: 0,
        transform: theme.direction === ThemeDirection.RTL ? 'rotate(180deg)' : 'inherit'
      }}
    >
      <img
        src={"https://www.nicepng.com/png/detail/211-2114255_free-bookshelf-png-book-on-shelf-png.png"}
        alt="Auth Background"
        width="100%"
        height="100%"
      />

    </Box>
  );
};

export default AuthBackground;
