/*
 *
 * FacebookButton reducer
 *
 */

import { fromJS } from 'immutable';
import {
    FACEBOOK_AUTH,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAILED,
} from './constants';

export const initialState = fromJS({
    fb: {
        loading: false,
        error: false,
        data: null,
        success: false,
    },
});

function facebookButtonReducer(state = initialState, action) {
    switch (action.type) {
        case FACEBOOK_AUTH:
            return state
                .setIn(['fb', 'loading'], true)
                .setIn(['fb', 'error'], false)
                .setIn(['fb', 'success'], false)
                .setIn(['fb', 'data'], null);
        case FACEBOOK_AUTH_SUCCESS:
            return state
                .setIn(['fb', 'loading'], false)
                .setIn(['fb', 'error'], false)
                .setIn(['fb', 'success'], true)
                .setIn(['fb', 'data'], action.fbData);
        case FACEBOOK_AUTH_FAILED:
            return state
                .setIn(['fb', 'loading'], false)
                .setIn(['fb', 'success'], false)
                .setIn(['fb', 'error'], true)
                .setIn(['fb', 'data'], action.fbData);
        default:
            return state;
    }
}

export default facebookButtonReducer;
