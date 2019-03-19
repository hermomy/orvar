/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';

import {
    FETCH_CONFIG,
    FETCH_CONFIG_SUCCESS,
    FETCH_CONFIG_FAILED,
} from './constants';

const initialState = fromJS({
    config: {},
});

function appReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONFIG:
            return state;
        case FETCH_CONFIG_SUCCESS:
            return state
                .set('config', action.payload);
        case FETCH_CONFIG_FAILED:
            return state
                .set('config', action.payload);
        default:
            return state;
    }
}

export default appReducer;
