// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps, listParametersType, UserGetById } from 'types/users';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['user'] = {
    error: null,
    success: null,
    usersFdd: null,
    userGetById: null,
    usersList: null,
    isLoading: false
};

const slice = createSlice({
    name: 'users',
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

        // GET BOOKS FDD
        getUsersFddSuccess(state, action) {
            state.usersFdd = action.payload;
            state.success = null;
        },

        // GET BOOKS FDD
        getAllUsersSuccess(state, action) {
            state.usersList = action.payload;
            state.success = null;
        },

        // Get USER BY ID
        GetUserByIdSuccess(state, action) {
            state.userGetById = action.payload;
            state.success = null
        },

        // Get USER BY ID
        InactiveUserSuccess(state, action) {
            state.success = "User Inactive Successfully";
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

export function getUsersFdd() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/auth/fdd');
            dispatch(slice.actions.getUsersFddSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function getAllUsers(query: listParametersType) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/book-management/auth', { params: query });
            dispatch(slice.actions.getAllUsersSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * GET USER Default Branch
 * @param id
 * @returns
 */
export function getUserById(userId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axios.get(`/api/v1/book-management/auth/get/${userId} `);
            dispatch(slice.actions.GetUserByIdSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * UPDATE USER
 * @param user
 * @returns
 */
export function updateUser(user: UserGetById) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axios.put(`/api/v1/book-management/auth/update/${user._id}`, user);
            dispatch(slice.actions.GetUserByIdSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * UPDATE USER
 * @param user
 * @returns
 */
export function inactiveUser(userId: string, status: boolean) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axios.put(`/api/v1/book-management/auth/inactive/${userId}`, { status: status });
            dispatch(slice.actions.InactiveUserSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}