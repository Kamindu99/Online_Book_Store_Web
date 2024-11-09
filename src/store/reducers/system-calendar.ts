//third-party
import { EventInput } from '@fullcalendar/common';
import { createSlice } from "@reduxjs/toolkit";

//project imports
import axiosServices from "utils/axios";
import { dispatch } from "../index";

//import calendarCode types
import { CalendarCode, DefaultRootStateProps } from "types/system-calendar";


const initialState: DefaultRootStateProps['calendarCode'] = {
    error: null,
    success: null,
    calendarCodes: null,
    calendarCodesFdd: null,
    calendarCode: null,
    isLoading: false
};

const slice = createSlice({
    name: 'calendarCode',
    initialState,
    reducers: {
        //TO INITIAL STATE
        hasInitialState(state) {
            state.error = null;
            state.success = null;
            state.isLoading = false;
        },

        //HAS ERROR
        hasError(state, action) {
            state.error = action.payload;

        },
        startLoading(state) {
            state.isLoading = true;
        },
        finishLoading(state) {
            state.isLoading = false;
        },


        //POST COLOR CODE
        addCalendarCodeSuccess(state, action) {
            state.success = "Holiday added successfully"
        },

        //GET COLOR CODE
        fetchCalendarCodeSuccess(state, action) {
            state.calendarCode = action.payload;
            state.success = null

        },

        //GET  ALL COLOR CODE
        fetchCalendarCodesSuccess(state, action) {
            state.calendarCodes = action.payload?.result;
            state.success = null
        },

        //GET  ALL COLOR CODE Fdd
        fetchCalendarCodesSuccessFdd(state, action) {
            state.calendarCodesFdd = action.payload;
            state.success = null
        },

        //UPDATE COLOR CODE
        updateCalendarCodeSuccess(state, action) {
            state.success = "Holiday updated successfully"
        },

        //DELETE COLOR CODE
        deleteCalendarCodeSuccess(state, action) {
            state.success = "Holiday deleted successfully"
        }
    }
})

//Reducer

export default slice.reducer;

/**
 * *TO INITIAL STATE
 * @returns
 */

export function toInitialState() {
    return async () => {
        dispatch(slice.actions.hasInitialState())
    }
}


/**
 * POST COLOR CODE
 * @param newCalendarCode
 * @returns
 */
export function addCalendarCode(newEvent: Omit<EventInput, 'id'>) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.post('/api/v1/parameter-management/holiday', newEvent);
            dispatch(slice.actions.addCalendarCodeSuccess(response.data));

        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }

    }
}

/**
* GET COLOR CODE
* @param id
* @returns
*/
export function fetchCalendarCode(id: string) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.post(`/api/v1/parameter-management/holiday/${id}`);
            dispatch(slice.actions.fetchCalendarCodeSuccess(response.data));

        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }

    }
}

/**
 * GET ALL COLOR CODE
 * @param queryParams
 * @returns
 */
export function fetchCalendarCodes() {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            let queryParams = {
                page: 0,
                per_page: 1000,
                direction: "asc",
                sort: 'holidayDate'
            }
            const response = await axiosServices.get('/api/v1/parameter-management/holiday', { params: queryParams });
            dispatch(slice.actions.fetchCalendarCodesSuccess(response.data));

        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }

    }
}


/**
 * UPDATE COLOR CODE
 * @param updatedCalendarCode
 * @returns
 */
export function updateCalendarCode(sysCalId: string, updatedCalendarCode: CalendarCode) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            const response = await axiosServices.put(`/api/v1/parameter-management/holiday/${sysCalId}`, updatedCalendarCode);
            dispatch(slice.actions.updateCalendarCodeSuccess(response.data));

        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }

    }
}
/**
 * DELETE COLOR CODE
 * @param calendarCodeId
 * @returns
 */
export function deleteCalendarCode(calendarCodeId: string) {
    return async () => {
        dispatch(slice.actions.startLoading());

        try {
            await axiosServices.delete(`/api/v1/parameter-management/holiday/${calendarCodeId}`);
            dispatch(slice.actions.deleteCalendarCodeSuccess(calendarCodeId));

        } catch (error) {
            dispatch(slice.actions.hasError(error));
        } finally {
            dispatch(slice.actions.finishLoading());
        }

    }
}