/*
 *
 * ProductView actions
 *
 */

import {
    GET_PRODUCT, GET_PRODUCT_FAIL, GET_PRODUCT_SUCCESS,
} from './constants';

export function getProduct(api) {
    return {
        type: GET_PRODUCT,
        api,
    };
}

export function getProductById(productId) {
    return {
        type: GET_PRODUCT,
        api: `http://api.hermo.my/mall/${productId}`,
    };
}

export function getProductFail() {
    return {
        type: GET_PRODUCT_FAIL,
    };
}

export function getProductSuccess(data) {
    return {
        type: GET_PRODUCT_SUCCESS,
        data,
    };
}
