/*
 *
 * AboutUs actions
 *
 */

import {
    GET_CAREER,
    GET_PAYMENT_BANK,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
} from './constants';

export function getCareer() {
    return {
        type: GET_CAREER,
    };
}

export function getPaymentBank() {
    return {
        type: GET_PAYMENT_BANK,
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
