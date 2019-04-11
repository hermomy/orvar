/*
 *
 * ProfilePage actions
 *
 */

import {
    GET_PROFILE,
    GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,
} from './constants';

export function getProfile() {
    return {
        type: GET_PROFILE,
    };
}

export function getProfileSuccess(res) {
    return {
        type: GET_PROFILE_SUCCESS,
        payload: res,
    };
}

export function getProfileFail(res) {
    return {
        type: GET_PROFILE_FAIL,
        payload: res,
    };
}
