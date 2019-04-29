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
    POST_WISHLIST,
} from './constants';

export function getData(path, dataType, api, queryParamString) {
    return {
        type: GET_DATA,
        path,
        dataType,
        api,
        queryParamString,
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

export function postWishlist(id) {
    return {
        type: POST_WISHLIST,
        id,
    };
}
