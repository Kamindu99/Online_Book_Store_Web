import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import { Grid } from '@mui/material';

// types

// project imports
import MainCard from 'components/MainCard';
import ProductImages from 'sections/book-management/view/ProductImages';
import ProductInfo from 'sections/book-management/view/ProductInfo';
import { useDispatch, useSelector } from 'store';
import { getBookById } from 'store/reducers/book-master';
import useAuth from 'hooks/useAuth';
import { createBookfavourite, deleteBookfavourite, toInitialState } from 'store/reducers/favourite-book';
import { openSnackbar } from 'store/reducers/snackbar';
import { Loading } from 'utils/loading';
import ProductReview from 'sections/book-management/view/ProductReview';
import RelatedProducts from 'sections/book-management/view/RelatedProducts';

// ==============================|| PRODUCT DETAILS - MAIN ||============================== //

const ProductDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { user } = useAuth()

    const { bookById } = useSelector(state => state.book)
    const { success, error, isLoading } = useSelector(state => state.favouriteBook)

    useEffect(() => {
        dispatch(getBookById({
            bookId: id!,
            userId: user?.id!
        }));
    }, [id, dispatch, success]);

    const handleBorrow = (event: React.MouseEvent) => {
        // Prevent the event from propagating to the Card's onClick
        event.stopPropagation();
        // Handle the borrow action
        if (user && bookById) {
            if (!bookById?.isFavourite) {
                dispatch(createBookfavourite({ bookId: bookById?._id, userId: user.id }))
            } else {
                dispatch(deleteBookfavourite(bookById?._id, user.id))
            }
        }
    };

    useEffect(() => {
        if (error != null) {
            let defaultErrorMessage = "ERROR";
            // @ts-ignore
            const errorExp = error as Template1Error
            if (errorExp.message) {
                defaultErrorMessage = errorExp.message
            }
            dispatch(
                openSnackbar({
                    open: true,
                    message: defaultErrorMessage,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            dispatch(toInitialState());
        }
    }, [error]);

    useEffect(() => {
        if (success != null) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: success,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            dispatch(toInitialState());
        }
    }, [success])

    if (isLoading) {
        return <Loading />
    }

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
                                    <ProductInfo product={bookById} handleBorrow={handleBorrow} />
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={7} xl={8}>
                        <MainCard>
                            <ProductReview product={id!} />
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} md={5} xl={4} sx={{ position: 'relative' }}>
                        <MainCard
                            title="Related Products"
                            sx={{
                                height: 'calc(100% - 16px)',
                                position: { xs: 'relative', md: 'absolute' },
                                top: '16px',
                                left: { xs: 0, md: 16 },
                                right: 0
                            }}
                            content={false}
                        >
                            <RelatedProducts id={id} />
                        </MainCard>
                    </Grid>
                </Grid>

            )}
        </>
    );
};

export default ProductDetails;
