// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { Books, DefaultRootStateProps, listParametersType } from 'types/book-master';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['book'] = {
    error: null,
    success: null,
    booksList: null,
    booksFdd: null,
    booksCount: null,
    bookCode: null,
    isLoading: false
};

const slice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        // TO INITIAL STATE
        hasInitialState(state) {
            state.error = null;
            state.success = null;
            state.isLoading = false;
        },

        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        startLoading(state) {
            state.isLoading = true;
        },

        finishLoading(state) {
            state.isLoading = false;
        },

        // GET BOOKS
        getBooksSuccess(state, action) {
            state.booksList = action.payload;
            state.success = null;
        },

        // GET BOOKS
        getBookCodeSuccess(state, action) {
            state.bookCode = action.payload;
            state.success = null;
        },

        // GET BOOKS FDD
        getBooksFddSuccess(state, action) {
            state.booksFdd = action.payload;
            state.success = null;
        },

        // GET BOOKS Count
        getBooksCountSuccess(state, action) {
            state.booksCount = action.payload;
            state.success = null;
        },

        // POST BOOK
        createBookSuccess(state, action) {
            state.success = "Book created successfully";
        },

        // PUT BOOK
        updateBookSuccess(state, action) {
            state.success = "Book Update successfully";
        },

        // DELETE BOOK
        deleteBookSuccess(state, action) {
            state.success = "Book Delete successfully";
        },
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

/**
 * TO INITIAL STATE
 * @returns 
 */
export function toInitialState() {
    return async () => {
        dispatch(slice.actions.hasInitialState())
    }
}

export function getBooks(query: listParametersType) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/book-master', { params: query });
            dispatch(slice.actions.getBooksSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function getBooksFdd() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/book-master/fdd');
            dispatch(slice.actions.getBooksFddSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function getBooksCount() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/book-master/dashboard-count');
            dispatch(slice.actions.getBooksCountSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function getBookCode() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/book-master/get-book-code');
            dispatch(slice.actions.getBookCodeSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function createBook(createBookProps: Books) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/v1/book-management/book-master/', createBookProps);
            dispatch(slice.actions.createBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function updateBook(updateBookProps: Books) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/v1/book-management/book-master/${updateBookProps?._id}`, updateBookProps);
            dispatch(slice.actions.updateBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function deleteBook(bookId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`/api/v1/book-management/book-master/${bookId}`);
            dispatch(slice.actions.deleteBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}





