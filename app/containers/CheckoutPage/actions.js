/*
 *
 * CheckoutPage actions
 *
 */

import {
    GET_CHECKOUT_DATA,
    CHECKOUT_DATA_SUCCESS,
    CHECKOUT_DATA_FAILED,
    QTY_UPDATE,
    QTY_UPDATE_SUCCESS,
    QTY_UPDATE_FAIL,
    ITEM_DELETE,
    ITEM_DELETE_SUCCESS,
    ITEM_DELETE_FAIL,
} from './constants';

export function getCheckout() {
    return {
        type: GET_CHECKOUT_DATA,
    };
}

export function checkoutSuccess(response) {
    return {
        type: CHECKOUT_DATA_SUCCESS,
        response,
    };
}

export function checkoutFailed(response) {
    return {
        type: CHECKOUT_DATA_FAILED,
        response,
    };
}

export function updateQty(qty, id) {
    return {
        type: QTY_UPDATE,
        qty,
        id,
    };
}

export function updateQtySuccess(response) {
    return {
        type: QTY_UPDATE_SUCCESS,
        response,
    };
}

export function updateQtyFail() {
    return {
        type: QTY_UPDATE_FAIL,
    };
}

export function removeItemInCart(id) {
    return {
        type: ITEM_DELETE,
        id,
    };
}

export function removeItemInCartSuccess(response) {
    return {
        type: ITEM_DELETE_SUCCESS,
        response,
    };
}

export function removeItemInCartFail() {
    return {
        type: ITEM_DELETE_FAIL,
    };
}
