// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { Booksorder, DefaultRootStateProps, queryStringParams } from 'types/book-order';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['bookorder'] = {
    error: null,
    success: null,
    booksorderList: null,
    booksorderFdd: null,
    isLoading: false
};

const slice = createSlice({
    name: 'booksorder',
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
            state.booksorderList = action.payload;
            state.success = null;
        },

        // GET BOOKS FDD
        getBooksFddSuccess(state, action) {
            state.booksorderFdd = action.payload;
            state.success = null;
        },

        // POST BOOK
        createBookSuccess(state, action) {
            state.success = "Book order successfully";
        },

        // PUT BOOK
        updateBookSuccess(state, action) {
            state.success = "Book order Update successfully";
        },

        // PUT BOOK RETURN
        updateReturnBookSuccess(state, action) {
            state.success = "Book Approved successfully";
        },

        // DELETE BOOK
        deleteBookSuccess(state, action) {
            state.success = "Book order Deleted successfully";
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

export function getBooksorder(query: queryStringParams) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/pre-order', { params: query });
            dispatch(slice.actions.getBooksSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function getBooksorderFdd() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/pre-order/fdd');
            dispatch(slice.actions.getBooksFddSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function createBookorder(createBookProps: Booksorder) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/v1/book-management/pre-order/', createBookProps);
            dispatch(slice.actions.createBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function updateBookorder(updateBookProps: Booksorder) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/v1/book-management/pre-order/approve/${updateBookProps?._id}`, updateBookProps);
            dispatch(slice.actions.updateBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function updateReturnBookorder(bookTransferId: string, bookId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/v1/book-management/pre-order/return/${bookTransferId}/${bookId}`);
            dispatch(slice.actions.updateReturnBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function deleteBookorder(bookId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`/api/v1/book-management/pre-order/${bookId}`);
            dispatch(slice.actions.deleteBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}