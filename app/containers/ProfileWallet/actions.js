/*
 *
 * ProfileWallet actions
 *
 */

import {
    GET_VOUCHER_DATA,
    GET_VOUCHER_DATA_SUCCESS,
    GET_VOUCHER_DATA_FAILED,
} from './constants';

export function getVoucherData({ status, filterType }) {
    return {
        type: GET_VOUCHER_DATA,
        status,
        filterType,
    };
}

export function getVoucherDataSuccess(response) {
    return {
        type: GET_VOUCHER_DATA_SUCCESS,
        data: response.data,
    };
}

export function getVoucherDataFailed(response) {
    return {
        type: GET_VOUCHER_DATA_FAILED,
        data: response.data,
    };
}
