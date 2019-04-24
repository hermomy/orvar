/*
 *
 * CartPage actions
 *
 */

import {
    GET_CHECKOUT_DATA,
    CHECKOUT_DATA_SUCCESS,
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
