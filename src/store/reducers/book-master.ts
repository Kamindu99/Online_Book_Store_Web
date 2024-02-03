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

        // GET PRODUCTS
        getProductsSuccess(state, action) {
            state.books = action.payload;
        },

        // POST PRODUCT
        createProductSuccess(state, action) {
            state.success = "Product created successfully";
        },

        // PUT PRODUCT
        updateProductSuccess(state, action) {
            state.success = "Product Update successfully";
        },

        // DELETE PRODUCT
        deleteProductSuccess(state, action) {
            state.success = "Product Delete successfully";
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
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('http://localhost:8000/api/v1/book-management/book-master/all/');
            dispatch(slice.actions.getProductsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function createProduct(createProductProps: Books) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('http://localhost:8000/api/v1/book-management/book-master/create/', createProductProps);
            dispatch(slice.actions.createProductSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * UPDATE Product_STATUS
 * @param updateProductProps
 * @returns 
 */
export function updateProduct(updateProductProps: Books) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/book-management/book-master/update/${updateProductProps?.bookId}`, updateProductProps);
            dispatch(slice.actions.updateProductSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function deleteProduct(bookId: number) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/book-management/book-master/delete/${bookId}`);
            dispatch(slice.actions.deleteProductSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}






