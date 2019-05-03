/*
 *
 * CheckoutPage reducer
 *
 */

import { fromJS } from 'immutable';
import { dataChecking } from 'globalUtils';
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

export const initialState = fromJS({
    loading: false,
    error: false,
    checkout: {
        loading: false,
        error: false,
        data: null,
    },
});

function checkoutPageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHECKOUT_DATA:
            return state
                .setIn(['checkout', 'loading'], true)
                .setIn(['checkout', 'error'], false);
        case CHECKOUT_DATA_SUCCESS:
            return state
                .setIn(['checkout', 'loading'], false)
                .setIn(['checkout', 'error'], false)
                .setIn(['checkout', 'data'], action.checkoutData);
        case CHECKOUT_DATA_FAILED:
            return state
                .setIn(['checkout', 'loading'], false)
                .setIn(['checkout', 'error'], true)
                .setIn(['checkout', 'data'], action.checkoutData);
        case QTY_UPDATE:
            return state
                .setIn(['checkout', 'loading'], true)
                .setIn(['checkout', 'error'], false);
        case QTY_UPDATE_SUCCESS:
            return state
                .setIn(['checkout', 'loading'], false)
                .setIn(['checkout', 'error'], false)
                .setIn(['checkout', 'data'], dataChecking(action, 'qtyItem', 'cart'));
        case QTY_UPDATE_FAIL:
            return state
                .setIn(['checkout', 'loading'], false)
                .setIn(['checkout', 'error'], true)
                .setIn(['checkout', 'data'], dataChecking(action, 'qtyItem', 'cart'));
        case ITEM_DELETE:
            return state
                .setIn(['checkout', 'loading'], true)
                .setIn(['checkout', 'error'], false);
        case ITEM_DELETE_SUCCESS:
            return state
                .setIn(['checkout', 'loading'], false)
                .setIn(['checkout', 'error'], false)
                .setIn(['checkout', 'data'], dataChecking(action, 'itemUpdate', 'cart'));
        case ITEM_DELETE_FAIL:
            return state
                .setIn(['checkout', 'loading'], false)
                .setIn(['checkout', 'error'], true)
                .setIn(['checkout', 'data'], dataChecking(action, 'itemUpdate', 'cart'));
        default:
            return state;
    }
}

export default checkoutPageReducer;
