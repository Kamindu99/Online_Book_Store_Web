/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material ui
import {
    Box,
    Button,
    Collapse,
    Dialog,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SpeedDial,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';

// third-party

// project import
import { DownOutlined, UpOutlined, CloseOutlined, SortAscendingOutlined, SortDescendingOutlined, PlusOutlined } from '@ant-design/icons';
import { TablePagination, TableParamsType } from 'components/third-party/ReactTable';
import { useDispatch, useSelector } from 'store';
import { getBooks, toInitialState } from 'store/reducers/book-master';
import { openSnackbar } from 'store/reducers/snackbar';
import { listParametersType } from 'types/book-master';
import BookCard from './book-card';
import { dataProps } from './types/types';
import { Loading } from 'utils/loading';
import { toInitialState as toInitialStateFavourite } from 'store/reducers/favourite-book';
import useAuth from 'hooks/useAuth';
import { getCateogyCodesFdd, toInitialState as toInitialStateCat } from 'store/reducers/category-code';
import AddEditBook from 'sections/book-management/book-master/AddEditBook';
import { PopupTransition } from 'components/@extended/Transitions';
import { CategoryCodeDTO } from 'types/category-code';
import AlertBookDelete from 'sections/book-management/book-master/AlertBookDelete';

// ==============================|| List ||============================== //

const List = () => {

    const dispatch = useDispatch();
    const { booksList, error, isLoading, success } = useSelector(state => state.book)
    const { success: favoSuccess, error: errorfavo, isLoading: isLoadingFavo } = useSelector(state => state.favouriteBook)
    const { success: successCat, error: errorCat, isLoading: isLoadingCat, categoryCodeFdd } = useSelector(state => state.categoryCode)
    const [bookList, setBookList] = useState<dataProps[]>([]);
    const [categoryCodes, setCategoryCodes] = useState<CategoryCodeDTO[]>([]);

    const { user } = useAuth()

    // ----------------------- | API Call - Roles | ---------------------

    const [page, setPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const [direction, setDirection] = useState<"asc" | "desc">(user?.email === 'wanigasinghebookcollection@gmail.com' ? 'desc' : 'asc');
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>('All');
    const [categoryName, setCategoryName] = useState<string>('All');
    const [sort, setSort] = useState<string>("_id");
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [categoryTerm, setCategoryTerm] = useState<string>("All"); // Category filter
    const [categoryTermName, setCategoryTermName] = useState<string>("All"); // Category filter
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term
    const [directionTerm, setDirectionTerm] = useState<"asc" | "desc">(user?.email === 'wanigasinghebookcollection@gmail.com' ? 'desc' : 'asc'); // Sort direction

    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const tableParams: TableParamsType = {
        page,
        setPage,
        perPage,
        setPerPage,
        direction,
        setDirection,
        sort,
        setSort,
        search,
        setSearch,
        pageCount: totalRecords
    }

    useEffect(() => {
        const listParameters: listParametersType = {
            page: page,
            per_page: perPage,
            direction: direction,
            sort: sort,
            categoryId: category === 'All' ? '' : category,
            search: search,
            userId: user?.id
        };
        dispatch(getBooks(listParameters));
    }, [dispatch, success, favoSuccess, page, perPage, direction, sort, search, category]);

    useEffect(() => {
        if (!booksList) {
            setBookList([])
            return
        }
        if (booksList == null) {
            setBookList([])
            return
        }
        setBookList(booksList?.result!)
        setTotalRecords(booksList?.pagination?.total!)
    }, [booksList])

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
        if (errorfavo != null) {
            let defaultErrorMessage = "ERROR";
            // @ts-ignore
            const errorExp = errorfavo as Template1Error
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
            dispatch(toInitialStateFavourite());
        }
    }, [error, errorfavo, errorCat]);

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
        if (favoSuccess != null) {
            dispatch(
                openSnackbar({
                    open: true,
                    message: favoSuccess,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            dispatch(toInitialStateFavourite());
        }
    }, [success, favoSuccess, successCat])

    useEffect(() => {
        if (categoryCodeFdd) {
            setCategoryCodes(categoryCodeFdd);
            dispatch(toInitialStateCat());
        }
    }, [categoryCodeFdd]);


    const handleCategoryChange = (event: any) => {
        setCategoryTerm(event.target.value as string);
        setCategoryTermName(categoryCodes?.find((category) => category._id === event.target.value)?.categoryName || 'All');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    useEffect(() => {
        dispatch(getCateogyCodesFdd());
    }, []);

    // Add Book Modal
    const [add, setAdd] = useState<boolean>(false);
    const [bookData, setBook] = useState<dataProps>();
    const handleAdd = () => {
        setAdd(!add);
        if (bookData && add === true) setBook(undefined);
    };

    //alert model
    const [openAlert, setOpenAlert] = useState(false);
    const [deletedBookId, setDeletedBookId] = useState<string | null>(null)

    const handleAlertClose = () => {
        setOpenAlert(!openAlert);
    };

    if (isLoading || isLoadingFavo || isLoadingCat) {
        return <Loading />
    }

    return (
        <Box sx={{ position: 'relative' }}>
            {/* Filter Bar */}
            <Box mb={3} sx={{ backgroundColor: 'white', padding: '15px' }}>
                {/* Arrow Button to Toggle Filter */}
                <Grid container justifyContent="space-between" alignItems="center" onClick={() => setIsFilterVisible(!isFilterVisible)}>
                    <Grid item>
                        <Typography variant="h6" color="Highlight" hidden={isFilterVisible}>
                            Filter by Category, Search
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton>
                                {isFilterVisible ? <UpOutlined /> : <DownOutlined />}
                            </IconButton>
                        </Box>
                    </Grid>
                </Grid>
                {/* Collapsible Filter Section */}
                <Collapse in={isFilterVisible}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={3} md={3}>
                            <FormControl variant="outlined" sx={{ minWidth: 180, width: '100%' }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categoryTerm}
                                    onChange={handleCategoryChange}
                                    label="Category"
                                >
                                    <MenuItem key={0} value={"All"}>All</MenuItem>
                                    {categoryCodes?.map((category) => (
                                        <MenuItem key={category._id} value={category._id}>{category.categoryName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={5.5} md={5.5}>
                            <TextField
                                label="Search"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={2} sm={0.5} md={0.5}>
                            <IconButton
                                onClick={() => {
                                    setDirectionTerm(directionTerm === 'asc' ? 'desc' : 'asc');
                                }}
                                color='inherit'
                                sx={{ backgroundColor: '#98d9f5' }}
                            >
                                {directionTerm === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                            </IconButton>
                        </Grid>

                        <Grid item xs={2} sm={0.5} md={0.5}>
                            <IconButton
                                onClick={() => {
                                    setPage(0);
                                    setCategory('All');
                                    setCategoryName('All');
                                    setSearch('');
                                    setCategoryTerm('All');
                                    setCategoryTermName('All');
                                    setSearchTerm('');
                                    setDirection('asc');
                                    setDirectionTerm('asc');
                                }}
                                color='error'
                                sx={{ backgroundColor: '#fce3e1' }}
                            >
                                <CloseOutlined />
                            </IconButton>
                        </Grid>

                        <Grid item xs={8} sm={2.5} md={2.5}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => {
                                    setPage(0);
                                    setCategory(categoryTerm);
                                    setCategoryName(categoryTermName);
                                    setSearch(searchTerm);
                                    setDirection(directionTerm);
                                }}
                            >
                                Apply Filters
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h6" color="Highlight" hidden={!isFilterVisible}>
                                Filter by {search ? `${search} in` : ''} "{categoryName}" Category {totalRecords} Books Found
                            </Typography>
                        </Grid>
                    </Grid>
                </Collapse>
            </Box>


            <Grid container spacing={2}>
                {bookList.map((book) => (
                    <Grid item xs={6} sm={6} md={2.4} key={book._id!}>
                        <BookCard
                            imageUrl={book.imageUrl!}
                            bookName={book.bookName!}
                            author={book.author!}
                            noOfPages={book.noOfPages!}
                            categoryName={book.categoryName!}
                            isActive={book.isActive!}
                            isFavourite={book.isFavourite!}
                            bookId={book._id!}
                            status={book.status!}
                            handleAdd={handleAdd}
                            setBook={setBook}
                            setDeletedBookId={setDeletedBookId}
                            setOpenAlert={setOpenAlert}
                            bookDetails={book}
                        />
                    </Grid>

                ))}
                <Grid item xs={12} sm={12} md={12}>
                    <TablePagination
                        gotoPage={tableParams?.setPage}
                        rows={[]}
                        setPageSize={tableParams?.setPerPage}
                        pageIndex={tableParams?.page}
                        pageSize={tableParams?.perPage}
                        pageCount={tableParams?.pageCount}
                    />
                </Grid>
            </Grid>

            {/* Dialog renders its body even if not open */}
            {add && user && user.email === 'wanigasinghebookcollection@gmail.com' &&
                <Dialog
                    maxWidth="sm"
                    TransitionComponent={PopupTransition}
                    keepMounted
                    fullWidth
                    onClose={handleAdd}
                    open={add}
                    sx={{ '& .MuiDialog-paper': { p: 0 }, transition: 'transform 225ms' }}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <AddEditBook book={bookData} onCancel={handleAdd} />
                </Dialog>
            }

            {user && user.email === 'wanigasinghebookcollection@gmail.com' &&
                <Tooltip title="Add New Book">
                    <SpeedDial
                        ariaLabel="add-event-fab"
                        sx={{ display: 'inline-flex', position: 'sticky', bottom: 24, left: '100%', transform: 'translate(-50%, -50% )' }}
                        icon={<PlusOutlined style={{ fontSize: '1.5rem' }} />}
                        onClick={handleAdd}
                    />
                </Tooltip>
            }
            {/* alert model */}
            {deletedBookId && <AlertBookDelete title={""} open={openAlert} handleClose={handleAlertClose} deleteId={deletedBookId} />}
        </Box>
    )
};

export default List;
