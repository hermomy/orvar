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
    GET_IMAGE_LINK,
    GET_IMAGE_LINK_SUCCESS,
    GET_IMAGE_LINK_FAILED,
} from './constants';


export const initialState = fromJS({
    loading: false,
    error: false,
    loginSuccess: false,
    image: null,
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
        case GET_IMAGE_LINK:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_IMAGE_LINK_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('image', action.imageLink);
        case GET_IMAGE_LINK_FAILED:
            return state;
        default:
            return state;
    }
}

export default loginFormReducer;
