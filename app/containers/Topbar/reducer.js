/*
 *
 * Header reducer
 *
 */

import { fromJS } from 'immutable';
import {
    FETCH_TOP_NAV,
    FETCH_TOP_NAV_SUCCESS,
    FETCH_TOP_NAV_FAILED,
} from './constants';

const initialState = fromJS({
    loading: false,
    error: false,
    topNav: [
        {
            text: 'Loading...',
            code: 'navigator-loading',
        },
    ],
});

function topbarReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TOP_NAV:
            return state
                .set('loading', true)
                .set('error', false);
        case FETCH_TOP_NAV_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .setIn(['topNav'], action.payload);
        case FETCH_TOP_NAV_FAILED:
            return state
                .set('loading', false)
                .set('error', true)
                .setIn(['topNav'], action.payload);
        default:
            return state;
    }
}

export default topbarReducer;
