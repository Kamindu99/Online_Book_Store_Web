import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    Chip,
    IconButton,
    Stack,
    Typography
} from '@mui/material';

// assets
import { Books } from 'types/book-master';
import { HeartFilled, HeartOutlined, WhatsAppOutlined } from '@ant-design/icons';

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product, handleBorrow }: { product: Books, handleBorrow: (event: React.MouseEvent) => void }) => {

    const [value] = useState<number>(1);
    const Navigate = useNavigate();

    const handleRequest = () => {
        const phoneNumber = "+94715273881"; // Your WhatsApp phone number in international format without the "+" sign
        const message = "Hello, I would like to request more information!";
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp link in a new tab
        window.open(whatsappLink, '_blank');
    };

    return (
        <Stack spacing={1}>
            <Typography sx={{ fontSize: { xs: "20px", sm: "26px" }, fontWeight: '700' }}>{product.bookName}</Typography>
            <Stack direction="row" spacing={2}>
                <Chip
                    size="large"
                    label={product.categoryName}
                    sx={{
                        width: 'fit-content',
                        borderRadius: '4px',
                        color: product.isActive ? 'success.main' : 'error.main',
                        bgcolor: product.isActive ? 'success.lighter' : 'error.lighter'
                    }}
                />
                <IconButton
                    aria-label="add to favorites"
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        fontSize: '1.5rem',
                    }}
                    onClick={handleBorrow}
                >
                    {product.isFavourite ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
                </IconButton>
                <IconButton
                    aria-label="whtsapp"
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        fontSize: '1.5rem',
                    }}
                    onClick={handleRequest}
                >
                    <WhatsAppOutlined style={{ color: 'green' }} />
                </IconButton>
            </Stack>
            <Typography color="CaptionText" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                Author :- {product.author}
            </Typography>

            <Typography color="CaptionText" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                Price :- {product.price}
            </Typography>

            <Typography color="CaptionText" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                No of Pages :- {product.noOfPages}
            </Typography>

            <Typography color="GrayText" sx={{ fontSize: { xs: "14px", sm: "16px" } }}>
                {product.bookName} ග්‍රන්ථය {product.categoryName} පොත් කාණ්ඩයට  අදාල පොතකි. එය {product.author} විසින් ලියන ලදී.
                මෙම පොතෙහි පිටු {product.noOfPages}ක් ඇත. පොත් කියවිමේ ආශාව ඇතිකර ගැනිමෙනුත්, කියවිමට සුදුසු පොත් තෝරා
                ගැනිමෙනුත් හැම කෙනකුටම තම ජිවිතය සාර්ථක කර ගැනිමට හැකියාව ලැබේ. කියවීම ඉතා වටිනා ගුණාංගයකි.
                එමඟින් සැලසෙන යහපතක් නම් අපේ භාෂා හැකියාව දියුණුවීම යි.
            </Typography>
            <br />
            <Stack direction="row" alignItems="center" spacing={1} sx={{ position: { xs: '', sm: 'absolute' }, bottom: 20, width: { xs: "100%", sm: "55%" } }}>
                {product.isActive && value > 0 && (
                    <Button fullWidth color="primary" variant="contained" size="large" onClick={handleBorrow}>
                        {product?.isFavourite ? 'Not Favourite' : 'Add to Favourite'}
                    </Button>
                )}
                <Button type="button" fullWidth disabled={value < 1 || !product.isActive} color="secondary" variant="outlined" size="large"
                    onClick={() => { Navigate(`/book-management/book-master/user-list`) }}>
                    {!product.isActive ? 'Sold Out' : 'Back'}
                </Button>
            </Stack>
        </Stack>
    );
};

export default ProductInfo;
