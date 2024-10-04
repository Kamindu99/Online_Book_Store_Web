// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { BookReviewsDTO, DefaultRootStateProps, queryStringParams } from 'types/book-reviews';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['bookReviews'] = {
    error: null,
    success: null,
    bookReviewsFdd: null,
    bookReviewsList: null,
    isLoading: false
};

const slice = createSlice({
    name: 'bookReviews',
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

        // GET BookReviews CODE
        getBookReviewsSuccess(state, action) {
            state.bookReviewsList = action.payload;
            state.success = null;
        },

        // GET BookReviews CODE FDD
        getBookReviewsFddSuccess(state, action) {
            state.bookReviewsFdd = action.payload;
            state.success = null;
        },

        // POST BookReviews CODE
        createBookReviewsSuccess(state, action) {
            state.success = "Review created successfully";
        },

        // PUT BookReviews CODE
        updateBookReviewsSuccess(state, action) {
            state.success = "Review updated successfully";
        },

        // DELETE BookReviews CODE
        deleteBookReviewsSuccess(state, action) {
            state.success = "Review deleted successfully";
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

export function getBookReviewsList(query: queryStringParams) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/reviews', { params: query });
            dispatch(slice.actions.getBookReviewsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function getBookReviewssFdd() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/reviews/fdd');
            dispatch(slice.actions.getBookReviewsFddSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function createBookReviews(createProps: BookReviewsDTO) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/v1/book-management/reviews', createProps);
            dispatch(slice.actions.createBookReviewsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function updateBookReviews(updateBookReviewsProps: BookReviewsDTO) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/v1/book-management/reviews/${updateBookReviewsProps?._id}`, updateBookReviewsProps);
            dispatch(slice.actions.updateBookReviewsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function deleteBookReviews(BookReviewsId?: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`/api/v1/book-management/reviews/${BookReviewsId}`);
            dispatch(slice.actions.deleteBookReviewsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}