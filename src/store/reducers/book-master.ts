// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps } from 'types/book-master';

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

        // GET PRODUCTS
        getProductsSuccess(state, action) {
            state.books = action.payload;
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

export function getProducts() {
    return async () => {
        try {
            const response = await axios.get('https://book-management-backend-jkfi.onrender.com/api/v1/book-management/book-master/all/');
            dispatch(slice.actions.getProductsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}









