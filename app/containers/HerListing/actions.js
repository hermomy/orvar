/*
 *
 * HerListing actions
 *
 */

import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAIL,
} from './constants';

export function getData(api, dataname) {
    return {
        type: GET_DATA,
        api,
        dataname,
    };
}

export function getDataSuccess(data, dataname) {
    return {
        type: GET_DATA_SUCCESS,
        data,
        dataname,
    };
}

export function getDataFail(error) {
    return {
        type: GET_DATA_FAIL,
        error,
    };
}
