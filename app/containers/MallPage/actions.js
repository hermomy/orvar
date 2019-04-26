/*
 *
 * MallPage actions
 *
 */

import {
    GET_MALL,
    GET_MALL_SUCCESS,
    GET_MALL_FAIL,
    GET_PRODUCT,
    POST_WISHLIST,
} from './constants';

export function getMall(api) {
    return {
        type: GET_MALL,
        api,
    };
}

export function getMallSuccess(res) {
    return {
        type: GET_MALL_SUCCESS,
        payload: res,
    };
}

export function getMallFail(error) {
    return {
        type: GET_MALL_FAIL,
        error,
    };
}

export function getProduct(url) {
    return {
        type: GET_PRODUCT,
        url,
    };
}

export function postWishlist(id, selfurl) {
    return {
        type: POST_WISHLIST,
        id,
        selfurl,
    };
}

