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
    ADD_TO_CART,
    ADD_TO_CART_FAIL,
    ADD_TO_CART_SUCCESS,
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

export function doProductFail(error) {
    return {
        type: GET_PRODUCT_FAIL,
        error,
    };
}

export function doProductSuccess(data) {
    return {
        type: GET_PRODUCT_SUCCESS,
        data,
    };
}

export function addToCart(payload) {
    return {
        type: ADD_TO_CART,
        payload,
    };
}

export function addToCartSuccess() {
    return {
        type: ADD_TO_CART_SUCCESS,
    };
}

export function addToCartFail(error) {
    return {
        type: ADD_TO_CART_FAIL,
        error,
    };
}
