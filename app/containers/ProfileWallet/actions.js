/*
 *
 * ProfileWallet actions
 *
 */

import {
    GET_USER_DATA,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILED,
    GET_VOUCHER_DATA,
    GET_VOUCHER_DATA_SUCCESS,
    GET_VOUCHER_DATA_FAILED,
    GET_VOUCHER_DETAIL,
    GET_VOUCHER_DETAIL_SUCCESS,
    GET_VOUCHER_DETAIL_FAILED,
    GET_BALANCE_DATA,
    GET_BALANCE_DATA_SUCCESS,
    GET_BALANCE_DATA_FAILED,
    GET_POINT_DATA,
    GET_POINT_DATA_SUCCESS,
    GET_POINT_DATA_FAILED,
} from './constants';

export function getUserData() {
    return {
        type: GET_USER_DATA,
    };
}

export function getUserDataSuccess(response) {
    return {
        type: GET_USER_DATA_SUCCESS,
        data: response.data,
    };
}

export function getUserDataFailed(response) {
    return {
        type: GET_USER_DATA_FAILED,
        data: response.data,
    };
}

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

export function getVoucherDetail({ voucherURL }) {
    return {
        type: GET_VOUCHER_DETAIL,
        voucherURL,
    };
}

export function getVoucherDetailSuccess(response) {
    return {
        type: GET_VOUCHER_DETAIL_SUCCESS,
        data: response.data,
    };
}

export function getVoucherDetailFailed(response) {
    return {
        type: GET_VOUCHER_DETAIL_FAILED,
        data: response.data,
    };
}

export function getBalanceData({ pageCount, rowsPerPage }) {
    return {
        type: GET_BALANCE_DATA,
        pageCount,
        rowsPerPage,
    };
}

export function getBalanceDataSuccess(response) {
    return {
        type: GET_BALANCE_DATA_SUCCESS,
        data: response.data,
    };
}

export function getBalanceDataFailed(response) {
    return {
        type: GET_BALANCE_DATA_FAILED,
        data: response.data,
    };
}

export function getPointData({ pageCount, rowsPerPage }) {
    return {
        type: GET_POINT_DATA,
        pageCount,
        rowsPerPage,
    };
}

export function getPointDataSuccess(response) {
    return {
        type: GET_POINT_DATA_SUCCESS,
        data: response.data,
    };
}

export function getPointDataFailed(response) {
    return {
        type: GET_POINT_DATA_FAILED,
        data: response.data,
    };
}
