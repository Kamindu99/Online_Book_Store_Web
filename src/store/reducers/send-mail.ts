// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps, SendMailDTO } from 'types/send-mail';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['sendMail'] = {
    error: null,
    success: null,
    isLoading: false
};

const slice = createSlice({
    name: 'sendMail',
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

        // POST CREATE SEND MAIL
        createSendMailSuccess(state, action) {
            state.success = "Send Mail successfully";
        }
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

export function createSendMail(createProps: SendMailDTO) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/v1/book-management/send-mail', createProps);
            dispatch(slice.actions.createSendMailSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}