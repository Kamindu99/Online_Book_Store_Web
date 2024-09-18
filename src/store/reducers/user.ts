// third-party
import { Dispatch, createSlice } from '@reduxjs/toolkit';

// project imports
import axiosServices from 'utils/axios';
import { dispatch } from '../index';

// types
import { DefaultRootStateProps, UserPostReq, queryParamsProps } from 'types/user';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['users'] = {
    error: null,
    success: null,
    users: null,
    userList: null,
    isLoading: false,
    selectUsers: null,
    userById: null,
    userDefaultBranchById: null,
    EditProfileSuccess: null
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

        // POST USER
        addUserSuccess(state, action) {
            state.success = "User created successfully."
        },

        // GET USER
        fetchUserSuccess(state, action) {
            state.users = action.payload;
            state.success = null
        },

        // GET ALL USER  
        fetchUsersSuccess(state, action) {
            state.userList = action.payload;
            state.success = null
        },

        // UPDATE USER
        updateUserSuccess(state, action) {
            state.success = "User updated successfully."
            state.EditProfileSuccess = "User updated successfully. Contact Your Admin to Login to the system."
        },

        // Get By ID USER
        GetByUserSuccess(state, action) {
            state.userById = action.payload;
            state.success = null
        },

        // DELETE USER
        deleteUserSuccess(state, action) {
            state.success = "User In-Active successfully."
        },

        //get all user
        fetchGetAllUserSuccess(state, action) {
            state.selectUsers = action.payload?.result;
            state.success = null;
        },

        // Get Default Branch
        GetByUserDefaultBranchSuccess(state, action) {
            state.userDefaultBranchById = action.payload;
            state.success = null
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
 * POST USER
 * @param newUser 
 * @returns 
 */
export function addUserSuccess(newUser: UserPostReq, userType: string) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.post(`/user/${userType}/register`, newUser);
            dispatch(slice.actions.addUserSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * GET ALL USER
 * @param queryParams 
 * @returns 
 */
export function fetchUsers(queryParams: queryParamsProps) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.get('/user-management/get-all-users', { params: queryParams });
            // const { result } = response.data;
            dispatch(slice.actions.fetchUsersSuccess(response.data));
            // if (pagination.total > 0) {
            //     const updatedQueryParams = { ...queryParams, per_page: pagination.total };
            //     const updatedResponse = await axiosServices.get('/user-management/get-all-users', { params: updatedQueryParams });
            //     dispatch(slice.actions.fetchUsersSuccess(updatedResponse.data));
            // }
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}
/**
 * GET USER BY ID
 * @param id
 * @returns
 */
export function getUserById(userId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.get(`/user-management/adMUser/${userId}`);
            dispatch(slice.actions.GetByUserSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * UPDATE USER
 * @param updatedUser 
 * @returns 
 */
export function updateUserSuccess(updatedUser: UserPostReq) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.put(`/user/Employee/updateUser/${updatedUser.userId}`, updatedUser);
            dispatch(slice.actions.updateUserSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

/**
 * GET ALL Users for dropdown
 * @param queryParams 
 * @returns 
 */
export function fetchGetAllUserSuccess(queryParams: queryParamsProps) {
    return async (dispatch: Dispatch) => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.get('/user-management/getUsers');
            const { data, pagination } = response.data;
            dispatch(slice.actions.fetchGetAllUserSuccess(data));
            if (pagination) {
                const updatedQueryParams = { ...queryParams, per_page: pagination.total };
                const updatedResponse = await axiosServices.get('/user-management/getUsers', { params: updatedQueryParams });
                dispatch(slice.actions.fetchGetAllUserSuccess(updatedResponse.data));
            }
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}
/**
 * DELETE User
 * @param userId 
 * @returns 
 */
export function deleteUserSuccess(userId: number) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            await axiosServices.delete(`/user-management/adMUser/restrict/${userId}`);
            dispatch(slice.actions.deleteUserSuccess(userId));
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
export function getDefaultBranchUserById(userId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.get(`/api/v1/book-management/auth/get/${userId} `);
            dispatch(slice.actions.GetByUserDefaultBranchSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

