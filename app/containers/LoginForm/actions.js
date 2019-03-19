/*
 *
 * LoginForm actions
 *
 */

import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
} from './constants';

export function doLogin(userdata) {
    return {
        type: AUTH_LOGIN,
        payload: userdata,
    };
}

export function doLogout() {
    return {
        type: AUTH_LOGOUT,
    };
}

export function loginSuccess(response) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        payload: response.token,
    };
}

export function loginFailed(response) {
    return {
        type: AUTH_LOGIN_FAILED,
        payload: response,
    };
}
