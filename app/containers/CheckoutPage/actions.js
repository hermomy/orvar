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

export function checkoutSuccess(checkoutData) {
    return {
        type: CHECKOUT_DATA_SUCCESS,
        checkoutData,
    };
}

export function checkoutFailed(checkoutData) {
    return {
        type: CHECKOUT_DATA_FAILED,
        checkoutData,
    };
}

export function updateQty(qty, id) {
    return {
        type: QTY_UPDATE,
        qty,
        id,
    };
}

export function updateQtySuccess(qtyItem) {
    return {
        type: QTY_UPDATE_SUCCESS,
        qtyItem,
    };
}

export function updateQtyFail(qtyItem) {
    return {
        type: QTY_UPDATE_FAIL,
        qtyItem,
    };
}

export function removeItemInCart(id) {
    return {
        type: ITEM_DELETE,
        id,
    };
}

export function removeItemInCartSuccess(itemUpdate) {
    return {
        type: ITEM_DELETE_SUCCESS,
        itemUpdate,
    };
}

export function removeItemInCartFail(itemUpdate) {
    return {
        type: ITEM_DELETE_FAIL,
        itemUpdate,
    };
}
