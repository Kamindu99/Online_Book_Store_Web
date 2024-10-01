
// material-ui
import { Card, CardMedia, Grid, Stack } from '@mui/material';

// project import
import IconButton from 'components/@extended/IconButton';
import MainCard from 'components/MainCard';
import { useTheme } from '@mui/material/styles';

// third-party
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

// assets
import {
    RedoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined
} from '@ant-design/icons';
import { ThemeMode } from 'types/config';

// types

// ==============================|| PRODUCT DETAILS - IMAGES ||============================== //

const ProductImages = ({ image }: { image: string }) => {

    const theme = useTheme();

    return (
        <>
            <Grid container spacing={0.5}>
                <Grid item xs={12} md={12} lg={12}>
                    <MainCard
                        content={false}
                        border={false}
                        boxShadow={false}
                        shadow={false}
                        sx={{
                            m: '0 auto',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',

                        }}
                    >
                        <TransformWrapper initialScale={1}>
                            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                                <Card sx={{
                                    m: '0 auto',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    bgcolor: theme.palette.mode === ThemeMode.DARK ? 'grey.50' : 'secondary.lighter',
                                    '& .react-transform-wrapper': { cursor: 'crosshair', height: '100%' },
                                    '& .react-transform-component': { height: '100%' }
                                }}>
                                    <TransformComponent>
                                        <CardMedia
                                            onClick={() => { }}
                                            component="img"
                                            image={image}
                                            title="Scroll Zoom"
                                            sx={{ borderRadius: `4px`, position: 'relative', height: { xs: '400px', sm: '550px' } }}
                                        />
                                    </TransformComponent>
                                    <Stack direction="row" className="tools" sx={{ position: 'absolute', bottom: 10, right: { xs: 10, sm: 60 }, zIndex: 1, backgroundColor: 'black' }}>
                                        <IconButton color="secondary" onClick={() => zoomIn()}>
                                            <ZoomInOutlined style={{ fontSize: '1.15rem' }} />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => zoomOut()}>
                                            <ZoomOutOutlined style={{ fontSize: '1.15rem' }} />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => resetTransform()}>
                                            <RedoOutlined style={{ fontSize: '1.15rem' }} />
                                        </IconButton>
                                    </Stack>
                                </Card>
                            )}
                        </TransformWrapper>
                    </MainCard>
                </Grid>
            </Grid>
        </>
    );
};

export default ProductImages;
