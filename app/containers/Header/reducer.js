/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import {
    LAYOUT_TOP_NAV,
    LAYOUT_TOP_NAV_SUCCESS,
    LAYOUT_TOP_NAV_FAIL,
} from './constants';


export const initialState = fromJS({
    loading: false,
    error: false,
    data: null,
});

function headerReducer(state = initialState, action) {
    switch (action.type) {
        case LAYOUT_TOP_NAV:
            return state
                .set('loading', true)
                .set('error', false);
        case LAYOUT_TOP_NAV_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.response);
        case LAYOUT_TOP_NAV_FAIL:
            return state
                .set('loading', false)
                .set('error', true)
                .set('data', action.response);
        default:
            return state;
    }
}

export default headerReducer;
