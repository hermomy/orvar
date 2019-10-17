/*
 *
 * AuthPage actions
 *
 */

import {
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from './constants';

export function resetPassword(resetData) {
    return {
        type: RESET_PASSWORD,
        resetData,
    };
}
export function resetPasswordSuccess(response) {
    return {
        type: RESET_PASSWORD_SUCCESS,
        response,
    };
}
export function resetPasswordFailed(response) {
    return {
        type: RESET_PASSWORD_FAILED,
        payload: response,
    };
}
