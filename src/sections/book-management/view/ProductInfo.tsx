import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
    Button,
    Chip,
    Rating,
    Stack,
    Typography
} from '@mui/material';

// third-party
import { Form, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

// types

// project imports
import { useDispatch } from 'store';
import { openSnackbar } from 'store/reducers/snackbar';

// assets
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Books } from 'types/book-master';

// types


const validationSchema = yup.object({
    color: yup.string().required('Color selection is required')
});

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }: { product: Books }) => {

    const [value] = useState<number>(1);
    const dispatch = useDispatch();
    const history = useNavigate();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: product._id,
            name: product.bookName,
            image: product.imageUrl,
            salePrice: product.author,
            offerPrice: product.author,
            color: '',
            size: '',
            quantity: 1
        },
        validationSchema,
        onSubmit: (values) => {
            values.quantity = value;
            // dispatch(addProduct(values, cart.checkout.products));
            dispatch(
                openSnackbar({
                    open: true,
                    message: 'Submit Success',
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: false
                })
            );

            history('/apps/e-commerce/checkout');
        }
    });

    const { values, handleSubmit } = formik;

    const addCart = () => {
        values.color = values.color ? values.color : 'primaryDark';
        values.quantity = value;
        // dispatch(addProduct(values, cart.checkout.products));
        dispatch(
            openSnackbar({
                open: true,
                message: 'Add To Cart Success',
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: false
            })
        );
    };

    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Rating
                    name="simple-controlled"
                    value={product.price}
                    icon={<StarFilled style={{ fontSize: 'inherit' }} />}
                    emptyIcon={<StarOutlined style={{ fontSize: 'inherit' }} />}
                    precision={0.1}
                    readOnly
                />
                <Typography color="textSecondary">({product.price?.toFixed(1)})</Typography>
            </Stack>
            <Typography variant="h3">{product.bookName}</Typography>
            <Chip
                size="small"
                label={product.isActive ? 'In Stock' : 'Out of Stock'}
                sx={{
                    width: 'fit-content',
                    borderRadius: '4px',
                    color: product.isActive ? 'success.main' : 'error.main',
                    bgcolor: product.isActive ? 'success.lighter' : 'error.lighter'
                }}
            />
            <Typography color="textSecondary">This watch from Apple is highly known for its features, like you can control your apple smartphone with this watch and you can do everything you would want to do on smartphone</Typography>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 4 }}>
                        <Button type="submit" fullWidth disabled={value < 1 || !product.isActive} color="primary" variant="contained" size="large">
                            {!product.isActive ? 'Sold Out' : 'Buy Now'}
                        </Button>

                        {product.isActive && value > 0 && (
                            <Button fullWidth color="secondary" variant="outlined" size="large" onClick={addCart}>
                                Add to Cart
                            </Button>
                        )}
                    </Stack>
                </Form>
            </FormikProvider>
        </Stack>
    );
};

export default ProductInfo;
