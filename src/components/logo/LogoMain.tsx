// material-ui

// ==============================|| LOGO SVG ||============================== //

import booklogo from 'assets/images/booklogo.png';

const LogoMain = ({ reverse, ...others }: { reverse?: boolean }) => {
  return (
    <>
      <img src={booklogo} alt="Library Logo" width={200} />
    </>
  );
};

export default LogoMain;
