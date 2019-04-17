/*
 *
 * ProfileWallet actions
 *
 */

import {
    GET_VOUCHER,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
    GET_BALANCE,
    GET_PROFILE,
} from './constants';

export function getVoucher(usage, pageNum) {
    return {
        type: GET_VOUCHER,
        usage,
        pageNum,
    };
}

export function getDataSuccess(res) {
    return {
        type: GET_DATA_SUCCESS,
        payload: res,
    };
}

export function getDataFail(Error) {
    return {
        type: GET_DATA_FAIL,
        Error,
    };
}

export function getBalance(pageNum) {
    return {
        type: GET_BALANCE,
        pageNum,
    };
}

export function getProfile() {
    return {
        type: GET_PROFILE,
    };
}
