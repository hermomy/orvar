/*
 *
 * CartPage actions
 *
 */

import {
    GET_CHECKOUT_DATA,
    CHECKOUT_DATA_SUCCESS,
} from './constants';

export function getCheckoutData() {
    return {
        type: GET_CHECKOUT_DATA,
    };
}

export function checkoutDataSuccess(r) {
    return {
        type: CHECKOUT_DATA_SUCCESS,
        r,
    };
}
