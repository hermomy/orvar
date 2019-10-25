/*
 *
 * FacebookButton actions
 *
 */

import {
    FACEBOOK_AUTH,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAILED,
} from './constants';

export function postFb(payload) {
    return {
        type: FACEBOOK_AUTH,
        payload,
    };
}
export function postFbSuccess(fbData) {
    return {
        type: FACEBOOK_AUTH_SUCCESS,
        fbData,
    };
}
export function postFbFailed(fbData) {
    return {
        type: FACEBOOK_AUTH_FAILED,
        fbData,
    };
}
