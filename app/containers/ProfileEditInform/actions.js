/*
 *
 * ProfileEditInform actions
 *
 */

import {
    GET_INFORM_CHOICE,
    GET_USER_INFORM,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
} from './constants';

// /common
export function getInformChoice() {
    return {
        type: GET_INFORM_CHOICE,
    };
}

export function getUserInform() {
    return {
        type: GET_USER_INFORM,
    };
}

export function getDataSuccess(res) {
    return {
        type: GET_DATA_SUCCESS,
        payload: res,
    };
}

export function getDataFail(error) {
    return {
        type: GET_DATA_FAIL,
        error,
    };
}
