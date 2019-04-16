/*
 *
 * CartPage actions
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

export function checkoutSuccess(r) {
    return {
        type: CHECKOUT_DATA_SUCCESS,
        r,
    };
}

export function checkoutFailed(r) {
    return {
        type: CHECKOUT_DATA_FAILED,
        r,
    };
}

export function updateQty(qty, id) {
    return {
        type: QTY_UPDATE,
        qty,
        id,
    };
}

export function updateQtySuccess(r) {
    return {
        type: QTY_UPDATE_SUCCESS,
        r,
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

export function removeItemInCartSuccess(r) {
    return {
        type: ITEM_DELETE_SUCCESS,
        r,
    };
}

export function removeItemInCartFail() {
    return {
        type: ITEM_DELETE_FAIL,
    };
}
