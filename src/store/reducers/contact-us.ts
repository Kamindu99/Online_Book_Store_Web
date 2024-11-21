// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';

// types
import emailjs from 'emailjs-com';
import { openSnackbar } from './snackbar';

// ----------------------------------------------------------------------

const initialState: { error: object | string | null, success: object | string | null, isLoading: boolean } = {
    error: null,
    success: null,
    isLoading: false
};

const slice = createSlice({
    name: 'contactUs',
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

        // POST CATEGORY CODE
        createContactUsSuccess(state, action) {
            console.log('Email sent successfully!', action.payload.text);
            state.success = "Email sent successfully!";
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

export function createContactUs(name: string, email: string, subject: string, message: string) {
    return async () => {
        dispatch(slice.actions.startLoading());

        // Your EmailJS service ID, template ID, and user ID
        const serviceID = 'service_enqwz5g';
        const templateID = 'template_uo5wmtr';
        const userID = '2ZDkcLHfPtIIlKu3V';

        try {
            const response = await emailjs.send(serviceID, templateID, {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
            }, userID)
            if (response.status === 200) {
                dispatch(slice.actions.createContactUsSuccess(response));
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Email sent successfully!',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: true
                    })
                );
            }
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}