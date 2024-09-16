// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { dispatch } from '../index';

// types
import { Books, DefaultRootStateProps } from 'types/book-master';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['book'] = {
    error: null,
    success: null,
    books: null,
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
            state.books = action.payload;
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

        // APPROVE BOOK
        approveBookSuccess(state, action) {
            state.success = "Book Approve successfully";
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

export function getBooks() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('http://localhost:8000/api/v1/book-management');
            dispatch(slice.actions.getBooksSuccess(response.data));
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
            const response = await axios.post('http://localhost:8000/api/v1/book-management/', createBookProps);
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
            const response = await axios.put(`http://localhost:8000/api/v1/book-management/${updateBookProps?._id}`, updateBookProps);
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
            const response = await axios.delete(`http://localhost:8000/api/v1/book-management/${bookId}`);
            dispatch(slice.actions.deleteBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function approveBook(bookId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/book-management/approve/${bookId}`);
            dispatch(slice.actions.approveBookSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}






