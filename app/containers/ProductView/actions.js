/*
 *
 * ProductView actions
 *
 */

import {
    GET_PRODUCT,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_REVIEW,
} from './constants';

export function getProductReview(productId) {
    return {
        type: GET_PRODUCT_REVIEW,
        productId,
    };
}

export function getProductById(productId) {
    return {
        type: GET_PRODUCT,
        productId,
    };
}

export function doProductFail() {
    return {
        type: GET_PRODUCT_FAIL,
    };
}

export function doProductSuccess(data) {
    return {
        type: GET_PRODUCT_SUCCESS,
        data,
    };
}
