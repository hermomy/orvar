/*
 *
 * AuthPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from './constants';

export const initialState = fromJS({
    loading: false,
    error: false,
    resetSuccess: false,
    data: null,
});

function authPageReducer(state = initialState, action) {
    switch (action.type) {
        case RESET_PASSWORD:
            return state
                .set('resetSuccess', false)
                .set('loading', true)
                .set('error', false)
                .set('data', null);
        case RESET_PASSWORD_SUCCESS:
            return state
                .set('resetSuccess', true)
                .set('loading', false)
                .set('data', action.response)
                .set('error', false);
        case RESET_PASSWORD_FAILED:
            return state
                .set('loading', false)
                .setIn(['error'], action.payload || {
                    messages: [{
                        text: 'ERROR: Please contact system admin...',
                        type: 'error',
                    }],
                });
        default:
            return state;
    }
}

export default authPageReducer;
