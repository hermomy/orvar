/*
 *
 * ProfileWholePage actions
 *
 */

import {
    MAIN_GET_PROFILE,
    MAIN_GET_PROFILE_SUCCESS,
    MAIN_GET_PROFILE_FAIL,
} from './constants';

export function mainGetProfile() {
    return {
        type: MAIN_GET_PROFILE,
    };
}

export function mainGetProfileSuccess(res) {
    return {
        type: MAIN_GET_PROFILE_SUCCESS,
        payload: res,
    };
}

export function mainGetProfileFail(error) {
    return {
        type: MAIN_GET_PROFILE_FAIL,
        error,
    };
}
