import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    Chip,
    Stack,
    Typography
} from '@mui/material';

// third-party

// types

// project imports
//import { useDispatch } from 'store';

// assets
import useAuth from 'hooks/useAuth';
import { Books } from 'types/book-master';

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }: { product: Books }) => {

    const [value] = useState<number>(1);
    const { user } = useAuth()
    // const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleBorrow = (event: React.MouseEvent) => {
        // Prevent the event from propagating to the Card's onClick
        event.stopPropagation();
        // Handle the borrow action
        if (user) {
            // if (!product?.isFavourite) {
            //     dispatch(createBookfavourite({ bookId, userId: user.id }))
            // } else {
            //     dispatch(deleteBookfavourite(bookId, user.id))
            // }
        }
    };

    return (
        <Stack spacing={1}>
            <Typography variant="h3">{product.bookName}</Typography>
            <Chip
                size="large"
                label={product.category}
                sx={{
                    width: 'fit-content',
                    borderRadius: '4px',
                    color: product.isActive ? 'success.main' : 'error.main',
                    bgcolor: product.isActive ? 'success.lighter' : 'error.lighter'
                }}
            />
            <Typography color="CaptionText">
                Author :- {product.author}
            </Typography>

            <Typography color="CaptionText">
                Price :- {product.price}
            </Typography>

            <Typography color="CaptionText">
                No of Pages :- {product.noOfPages}
            </Typography>

            <Typography color="textSecondary">
                එයා ආපු කෙනා පමණයි. ඉතින් ආපු කෙනා නෙමෙයිද යන්න ඕනි කෙනා? ආපු
                කෙනා නේන්නම් යන්න ඕනි කෙනා. ඒ හින්දම එයා ඇවිත් ගිය කෙනා. මම හිටපු කෙනා.
                හිටපු කෙනා තමයි ඉන්න කෙනා වෙන්නෙත්.ඒ හින්ද මං තාමත් ඉන්න කෙනා. ඒත් බැරිවෙලාවත්
                මං ආපු කෙනා උනානම්,කොහොමටවත් මං ගිය කෙනා වෙන්නෙනම් නෑ. එදාටත් මං ඉන්න කෙනා විතරම යි..

            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ position: { xs: '', sm: 'absolute' }, bottom: 20, width: { xs: "100%", sm: "55%" } }}>
                <Button type="button" fullWidth disabled={value < 1 || !product.isActive} color="primary" variant="contained" size="large"
                    onClick={() => { Navigate(`/book-management/book-master/user-list`) }}>
                    {!product.isActive ? 'Sold Out' : 'Back'}
                </Button>

                {product.isActive && value > 0 && (
                    <Button fullWidth color="secondary" variant="outlined" size="large" onClick={handleBorrow}>
                        Add to Favourite
                    </Button>
                )}
            </Stack>
        </Stack>
    );
};

export default ProductInfo;
