/*
 *
 * ProfileWholePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    MAIN_GET_PROFILE,
    MAIN_GET_PROFILE_SUCCESS,
    MAIN_GET_PROFILE_FAIL,
} from './constants';

export const initialState = fromJS({});

function profileWholePageReducer(state = initialState, action) {
    switch (action.type) {
        case MAIN_GET_PROFILE:
            return state
                .set('loading', true)
                .set('success', false);
        case MAIN_GET_PROFILE_SUCCESS:
            return state
                .set('data', Object.assign({ ...state.get('data') }, action.payload))
                .set('loading', true)
                .set('success', false);
        case MAIN_GET_PROFILE_FAIL:
            return state
                .set('loading', true)
                .set('success', false);
        default:
            return state;
    }
}

export default profileWholePageReducer;
