// material-ui
//import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoIconDark from 'assets/images/logo-icon-dark.svg';
 * import logoIcon from 'assets/images/logo-icon.svg';
 * import { ThemeMode } from 'types/config';
 *
 */
// ==============================|| LOGO ICON SVG ||============================== //

const LogoIcon = () => {
  //const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={theme.palette.mode === ThemeMode.DARK ? logoIconDark : logoIcon} alt="Mantis" width="100" />
     *
     */
    <img src={"https://freepngimg.com/thumb/book/6-books-png-image-with-transparency-background.png"} alt="Mantis" width="50" />
  );
};

export default LogoIcon;
