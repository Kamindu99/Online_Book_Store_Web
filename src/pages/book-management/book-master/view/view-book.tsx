import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';

// types

// project imports
import FloatingCart from 'components/cards/e-commerce/FloatingCart';
import MainCard from 'components/MainCard';
import ProductImages from 'sections/book-management/view/ProductImages';
import ProductInfo from 'sections/book-management/view/ProductInfo';
import { useDispatch, useSelector } from 'store';
import { getBookById } from 'store/reducers/book-master';

// ==============================|| PRODUCT DETAILS - MAIN ||============================== //

const ProductDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { bookById } = useSelector(state => state.book)

    useEffect(() => {
        dispatch(getBookById(id!));
    }, [id, dispatch]);

    // const handleFavourite = () => {
    //     // Add to favorite logic here
    // };

    return (
        <>
            {bookById && bookById._id === id && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MainCard>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4.8}>
                                    <ProductImages image={bookById?.imageUrl!} />
                                </Grid>
                                <Grid item xs={12} sm={7.2}>
                                    <ProductInfo product={bookById} />
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                </Grid>
            )}
            <FloatingCart />
        </>
    );
};

export default ProductDetails;
