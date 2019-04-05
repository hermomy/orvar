/*
 *
 * HerListing actions
 *
 */

import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_PRODUCT_SUCCESS,
    GET_DATA_FAIL,
} from './constants';

export function getData(dataType, queryParamString, api) {
    return {
        type: GET_DATA,
        dataType,
        queryParamString,
        api,
    };
}

export function getDataSuccess(data) {
    return {
        type: GET_DATA_SUCCESS,
        data,
    };
}

export function getProductSuccess(data) {
    return {
        type: GET_PRODUCT_SUCCESS,
        data,
    };
}

export function getDataFail(error) {
    return {
        type: GET_DATA_FAIL,
        error,
    };
}
