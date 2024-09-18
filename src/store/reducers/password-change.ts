// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axiosServices from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps, PwChangePostReq } from 'types/password-change';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['pw'] = {
    error: null,
    success: null,
    isLoading: false,
    passwordChangeForms: null,
};

const slice = createSlice({
    name: 'pw',
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

        // POST Password Change
        PwChangeSuccess(state, action) {
            state.success = "Password Changed successfully."
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

/**
 * POST PW CHANGE
 * @param pwChange 
 * @returns 
 */
export function PasswordChangeSuccess(pwChange: PwChangePostReq) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.put(`/api/v1/book-management/auth/password-reset/${pwChange?.userName}`, pwChange?.reqBody);
            dispatch(slice.actions.PwChangeSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}






