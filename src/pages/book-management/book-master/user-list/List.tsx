/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material ui
import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@mui/material';

// third-party

// project import
import { useDispatch, useSelector } from 'store';
import { getBooks, toInitialState } from 'store/reducers/book-master';
import { openSnackbar } from 'store/reducers/snackbar';
import BookCard from './book-card';
import { dataProps } from './types/types';
import { TablePagination, TableParamsType } from 'components/third-party/ReactTable';
import { listParametersType } from 'types/book-master';

// ==============================|| List ||============================== //

const List = () => {

    const dispatch = useDispatch();
    const { booksList, error, isLoading, success } = useSelector(state => state.book)

    const [bookList, setBookList] = useState<dataProps[]>([]);


    // ----------------------- | API Call - Roles | ---------------------

    const [page, setPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const [direction, setDirection] = useState<"asc" | "desc">("desc");
    const [search, setSearch] = useState<string>("");
    const [category, setCategory] = useState<string>('');
    const [sort, setSort] = useState<string>("_id");
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [categoryTerm, setCategoryTerm] = useState<string>("All"); // Category filter
    const [searchTerm, setSearchTerm] = useState<string>(''); // Search term

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
            category: category === 'All' ? '' : category,
            search: search
        };
        dispatch(getBooks(listParameters));
    }, [dispatch, success, page, perPage, direction, sort, search, category]);

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

    const handleBorrow = (bookId: string) => {
        // Handle the borrow action
        console.log(`Borrowing book with id ${bookId}`);
    };


    const handleCategoryChange = (event: any) => {
        setCategoryTerm(event.target.value as string);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    if (isLoading) {
        return <>Loading...</>
    }

    return (
        <>
            {/* Filter Bar */}
            <Box mb={3} sx={{ backgroundColor: 'white', padding: '15px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                        <FormControl variant="outlined" sx={{ minWidth: 180, width: '100%' }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={categoryTerm}
                                onChange={handleCategoryChange}
                                label="Category"
                            >
                                <MenuItem key={0} value={"All"}>
                                    All
                                </MenuItem>
                                <MenuItem key={1} value={"Adventure"}>
                                    Adventure
                                </MenuItem>
                                <MenuItem key={2} value={"Novel"}>
                                    Novel
                                </MenuItem>
                                <MenuItem key={3} value={"Short Stories"}>
                                    Short Stories
                                </MenuItem>
                                <MenuItem key={4} value={"Educational"}>
                                    Educational
                                </MenuItem>
                                <MenuItem key={5} value={"Religious"}>
                                    Religious
                                </MenuItem>
                                <MenuItem key={6} value={"Astrology"}>
                                    Astrology
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={5} md={5}>
                        <TextField
                            label="Search"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={3} md={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => {
                                setSearch(searchTerm);
                                setCategory(categoryTerm);
                            }}
                        >
                            Apply Filters
                        </Button>
                    </Grid>
                </Grid>
            </Box>


            <Grid container spacing={2}>
                {bookList.map((book) => (
                    <Grid item xs={6} sm={6} md={2.4} key={book._id!}>
                        <BookCard
                            imageUrl={book.imageUrl!}
                            bookName={book.bookName!}
                            author={book.author!}
                            noOfPages={book.noOfPages!}
                            category={book.category!}
                            isActive={book.isActive!}
                            onBorrow={() => handleBorrow(book._id!)}
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
        </>
    )
};

export default List;
