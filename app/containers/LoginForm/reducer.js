/*
 *
 * LoginForm reducer
 *
 */

import { fromJS } from 'immutable';
import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
} from './constants';


export const initialState = fromJS({
    loading: false,
    error: false,
    loginSuccess: false,
});

function loginFormReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return state
                .set('loginSuccess', false)
                .set('loading', true)
                .set('error', false);
        case AUTH_LOGIN_SUCCESS:
            return state
                .set('loginSuccess', true)
                .set('loading', false) // no need to remove loading, page will be redirect
                .set('error', false);
        case AUTH_LOGIN_FAILED:
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

export default loginFormReducer;
