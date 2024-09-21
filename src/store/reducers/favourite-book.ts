// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { Booksfavourite, DefaultRootStateProps, queryStringParams } from 'types/favourite-book';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['bookfavourite'] = {
    error: null,
    success: null,
    booksfavouriteList: null,
    booksfavouriteFdd: null,
    isLoading: false
};

const slice = createSlice({
    name: 'booksfavourite',
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
            state.booksfavouriteList = action.payload;
            state.success = null;
        },

        // GET BOOKS FDD
        getBooksFddSuccess(state, action) {
            state.booksfavouriteFdd = action.payload;
            state.success = null;
        },

        // POST BOOK
        createBookSuccess(state, action) {
            state.success = "Added Book to favourite successfully";
        },

        // PUT BOOK
        updateBookSuccess(state, action) {
            state.success = "Book borrowed Update successfully";
        },

        // PUT BOOK RETURN
        updateReturnBookSuccess(state, action) {
            state.success = "Book Return successfully";
        },

        // DELETE BOOK
        deleteBookSuccess(state, action) {
            state.success = "Removed Book from favourite successfully";
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

export function getBooksfavourite(query: queryStringParams) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/favourite', { params: query });
            dispatch(slice.actions.getBooksSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function getBooksfavouriteFdd() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/book-favourite/fdd');
            dispatch(slice.actions.getBooksFddSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function createBookfavourite(createBookProps: Booksfavourite) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/v1/book-management/favourite/', createBookProps);
            dispatch(slice.actions.createBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function updateBookfavourite(updateBookProps: Booksfavourite) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/v1/book-management/book-favourite/${updateBookProps?._id}`, updateBookProps);
            dispatch(slice.actions.updateBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function updateReturnBookfavourite(bookTransferId: string, bookId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/v1/book-management/book-favourite/return/${bookTransferId}/${bookId}`);
            dispatch(slice.actions.updateReturnBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function deleteBookfavourite(bookId?: string, userId?: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`/api/v1/book-management/favourite/${bookId}/${userId}`);
            dispatch(slice.actions.deleteBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}