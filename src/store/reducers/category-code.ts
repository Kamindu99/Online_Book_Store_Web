// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// types
import { CategoryCodeDTO, DefaultRootStateProps, queryStringParams } from 'types/category-code';

// ----------------------------------------------------------------------

const initialState: DefaultRootStateProps['categoryCode'] = {
    error: null,
    success: null,
    categoryCodeFdd: null,
    categoryCodeList: null,
    isLoading: false
};

const slice = createSlice({
    name: 'categoryCode',
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

        // GET CATEGORY CODE
        getCateogyCodeSuccess(state, action) {
            state.categoryCodeList = action.payload;
            state.success = null;
        },

        // GET CATEGORY CODE FDD
        getCateogyCodeFddSuccess(state, action) {
            state.categoryCodeFdd = action.payload;
            state.success = null;
        },

        // POST CATEGORY CODE
        createCateogyCodeSuccess(state, action) {
            state.success = "Category Code created successfully";
        },

        // PUT CATEGORY CODE
        updateCateogyCodeSuccess(state, action) {
            state.success = "Category Code updated successfully";
        },

        // DELETE CATEGORY CODE
        deleteCateogyCodeSuccess(state, action) {
            state.success = "Category Code deleted successfully";
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

export function getCateogyCodeList(query: queryStringParams) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/parameter-management/category', { params: query });
            dispatch(slice.actions.getCateogyCodeSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function getCateogyCodesFdd() {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.get('/api/v1/parameter-management/category/fdd');
            dispatch(slice.actions.getCateogyCodeFddSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function createCategoryCode(createProps: CategoryCodeDTO) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.post('/api/v1/parameter-management/category', createProps);
            dispatch(slice.actions.createCateogyCodeSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function updateCategoryCode(updateCategoryCodeProps: CategoryCodeDTO) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.put(`/api/v1/parameter-management/category/${updateCategoryCodeProps?._id}`, updateCategoryCodeProps);
            dispatch(slice.actions.updateCateogyCodeSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}

export function deleteCategoryCode(categoryId?: string) {
    return async () => {
        dispatch(slice.actions.startLoading());
        try {
            const response = await axios.delete(`/api/v1/parameter-management/category/${categoryId}`);
            dispatch(slice.actions.deleteCateogyCodeSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }
    };
}