/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material ui
import {
    Grid,
    Stack
} from '@mui/material';

// third-party


// project import
import { EmptyTable } from 'components/third-party/ReactTable';
import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'store';
import { getBooksorder, toInitialState } from 'store/reducers/book-order';
import { openSnackbar } from 'store/reducers/snackbar';
import { Loading } from 'utils/loading';
import BookCard from './book-card';
import { dataProps } from './types/types';
import AlertPreOrderApprove from 'sections/book-management/pre-order/AlertMyPreOrderApprove';

// ==============================|| Transfer Book List ||============================== //

const TransferBookList = () => {
    //  const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();

    const [bookList, setBookList] = useState<dataProps[]>([]);

    //alert model
    const [openAlert, setOpenAlert] = useState(false);
    const [bookTransferId, setBookTransferId] = useState<string | null>(null)

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
    };


    // ----------------------- | API Call - Roles | ---------------------

    const { booksorderList, error, isLoading, success } = useSelector(state => state.booksorder)

    useEffect(() => {
        dispatch(getBooksorder(
            {
                direction: "desc",
                page: 0,
                per_page: 10,
                search: '',
                sort: "_id",
                userId: user?.id
            }
        ))
    }, [success, user])

    useEffect(() => {
        if (!booksorderList) {
            setBookList([])
            return
        }
        if (booksorderList == null) {
            setBookList([])
            return
        }
        setBookList(booksorderList?.result!)
    }, [booksorderList])

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
            <Grid container spacing={2}>
                {bookList && bookList.length !== 0 ? <>
                    {bookList?.map((book) => (
                        <Grid item xs={6} sm={6} md={2.4} key={book._id!}>
                            <BookCard
                                imageUrl={book.bmBook?.imageUrl!}
                                bookName={book.bmBook?.bookName!}
                                author={book.bmBook?.author!}
                                noOfPages={book.bmBook?.noOfPages!}
                                categoryName={book.bmBook?.categoryName!}
                                orderId={book._id!}
                                status={book.status!}
                                setBookTransferId={setBookTransferId}
                                setOpenAlert={setOpenAlert}
                            />
                        </Grid>
                    ))}
                </> :
                    <Stack spacing={2} sx={{ width: "100%" }} alignItems="center">
                        <EmptyTable msg="No Data" colSpan={12} />
                    </Stack>
                }
            </Grid >
            {/* alert model */}
            {bookTransferId && <AlertPreOrderApprove title={'cancel'} open={openAlert} handleClose={handleAlertClose} deleteId={bookTransferId} />}
        </>
    )
};

export default TransferBookList;
