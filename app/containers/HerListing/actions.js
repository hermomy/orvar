/*
 *
 * HerListing actions
 *
 */

import {
    GETDATA,
    GETDATASUCCESS,
    GETDATAFAIL,
    GETPAGE,
    GETPAGESUCCESS,
    GETPAGEFAIL,
} from './constants';

export function getData(data) {
    return {
        type: GETDATA,
        data,
    };
}

export function getDataSuccess(payload) {
    return {
        type: GETDATASUCCESS,
        payload,
    };
}

export function getDataFail(error) {
    return {
        type: GETDATAFAIL,
        error,
    };
}

export function getPage(api) {
    return {
        type: GETPAGE,
        api,
    };
}

export function getPageSuccess(data) {
    return {
        type: GETPAGESUCCESS,
        data,
    };
}

export function getPageFail() {
    return {
        type: GETPAGEFAIL,
    };
}
