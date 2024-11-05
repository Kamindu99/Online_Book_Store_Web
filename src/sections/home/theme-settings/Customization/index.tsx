import { useMemo, useState } from 'react';

// material-ui
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import ThemeFont from './ThemeFont';
import DefaultThemeMode from './ThemeMode';
import ThemeWidth from './ThemeWidth';

// assets
import {
  BorderInnerOutlined,
  FontColorsOutlined,
  HighlightOutlined
} from '@ant-design/icons';

// types

// ==============================|| HEADER CONTENT - CUSTOMIZATION ||============================== //

const Customization = () => {
  const theme = useTheme();
  const { container, fontFamily, mode } = useConfig();

  // eslint-disable-next-line
  const themeMode = useMemo(() => <DefaultThemeMode />, [mode]);
  // eslint-disable-next-line
  const themeWidth = useMemo(() => <ThemeWidth />, [container]);
  // eslint-disable-next-line
  const themeFont = useMemo(() => <ThemeFont />, [fontFamily]);

  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <MainCard
        title="Theme Settings"
        sx={{
          border: 'none',
          borderRadius: 0,
          height: '80vh',
          '& .MuiCardHeader-root': { color: 'background.paper', bgcolor: 'primary.main', '& .MuiTypography-root': { fontSize: '1rem' } }
        }}
        content={false}
      >
        {/* <SimpleBar
          sx={{
            '& .simplebar-content': {
              display: 'flex',
              flexDirection: 'column'
            }
          }}
        > */}
        <Box
          sx={{
            margin: '20px',
            // height: 'calc(100vh - 64px)',
            '& .MuiAccordion-root': {
              borderColor: theme.palette.divider,
              '& .MuiAccordionSummary-root': {
                bgcolor: 'transparent',
                flexDirection: 'row',
                pl: 1
              },
              '& .MuiAccordionDetails-root': {
                border: 'none'
              },
              '& .Mui-expanded': {
                color: theme.palette.primary.main
              }
            }
          }}
        >
          <Accordion defaultExpanded>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Stack direction="row" spacing={1.25} alignItems="center">
                <IconButton
                  disableRipple
                  color="primary"
                  sx={{ bgcolor: 'primary.lighter' }}
                  onClick={handleToggle}
                  aria-label="settings toggler"
                >
                  <HighlightOutlined />
                </IconButton>
                <Stack>
                  <Typography variant="subtitle1" color="textPrimary">
                    Theme Mode
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Choose light or dark mode
                  </Typography>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>{themeMode}</AccordionDetails>
          </Accordion>
        </Box>
        <Box
          sx={{
            margin: '20px',
            // height: 'calc(100vh - 64px)',
            '& .MuiAccordion-root': {
              borderColor: theme.palette.divider,
              '& .MuiAccordionSummary-root': {
                bgcolor: 'transparent',
                flexDirection: 'row',
                pl: 1
              },
              '& .MuiAccordionDetails-root': {
                border: 'none'
              },
              '& .Mui-expanded': {
                color: theme.palette.primary.main
              }
            }
          }}
        >
          <Accordion defaultExpanded>
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <Stack direction="row" spacing={1.5} alignItems="center">
                <IconButton
                  disableRipple
                  color="primary"
                  sx={{ bgcolor: 'primary.lighter' }}
                  onClick={handleToggle}
                  aria-label="settings toggler"
                >
                  <BorderInnerOutlined />
                </IconButton>
                <Stack>
                  <Typography variant="subtitle1" color="textPrimary">
                    Layout Width
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Choose fluid or container layout
                  </Typography>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>{themeWidth}</AccordionDetails>
          </Accordion>
        </Box>
        <Box
          sx={{
            margin: '20px',
            // height: 'calc(100vh - 64px)',
            '& .MuiAccordion-root': {
              borderColor: theme.palette.divider,
              '& .MuiAccordionSummary-root': {
                bgcolor: 'transparent',
                flexDirection: 'row',
                pl: 1
              },
              '& .MuiAccordionDetails-root': {
                border: 'none'
              },
              '& .Mui-expanded': {
                color: theme.palette.primary.main
              }
            }
          }}
        >
          <Accordion defaultExpanded >
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <Stack direction="row" spacing={1.5} alignItems="center">
                <IconButton
                  disableRipple
                  color="primary"
                  sx={{ bgcolor: 'primary.lighter' }}
                  onClick={handleToggle}
                  aria-label="settings toggler"
                >
                  <FontColorsOutlined />
                </IconButton>
                <Stack>
                  <Typography variant="subtitle1" color="textPrimary">
                    Font Family
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Choose your font family.
                  </Typography>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>{themeFont}</AccordionDetails>
          </Accordion>
        </Box>
        {/* </SimpleBar> */}
      </MainCard>
    </>
  );
};

export default Customization;
