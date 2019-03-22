/*
 *
 * HerListing actions
 *
 */

import {
    GETDATA,
    GETDATASUCCESS,
    GETDATAFAIL,
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
