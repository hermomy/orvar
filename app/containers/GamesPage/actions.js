/*
 *
 * GamesPage actions
 *
 */

import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
} from './constants';

export function doLogin(loginData) {
    return {
        type: AUTH_LOGIN,
        loginData,
    };
}
export function loginSuccess(response) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        response,
    };
}
export function loginFailed(response) {
    return {
        type: AUTH_LOGIN_FAILED,
        payload: response,
    };
}
