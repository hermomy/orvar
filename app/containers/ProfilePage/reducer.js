/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_PROFILE,
    GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,
} from './constants';

export const initialState = fromJS({
    data: null,
    loading: false,
    error: false,
});

function profilePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROFILE:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_PROFILE_SUCCESS:
            return state
                .set('data', action.payload)
                .set('loading', false)
                .set('error', false);
        case GET_PROFILE_FAIL:
            return state
                .set('data', action.payload)
                .set('loading', false)
                .set('error', action.payload);
        default:
            return state;
    }
}

export default profilePageReducer;
