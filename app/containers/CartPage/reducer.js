/*
 *
 * CartPage reducer
 *
 */

import { fromJS } from 'immutable';
import { dataChecking } from 'globalUtils';
import {
    GET_CART_DATA,
    GET_CART_DATA_SUCCESS,
    GET_CART_DATA_FAILED,
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
    data: null,
});

function checkoutPageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CART_DATA:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_CART_DATA_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.cartData);
        case GET_CART_DATA_FAILED:
            return state
                .set('loading', false)
                .set('error', true)
                .set('data', action.cartData);
        case QTY_UPDATE:
            return state
                .set('loading', true)
                .set('error', false);
        case QTY_UPDATE_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', dataChecking(action, 'qtyItem', 'cart'));
        case QTY_UPDATE_FAIL:
            return state
                .set('loading', false)
                .set('error', true)
                .set('data', dataChecking(action, 'qtyItem', 'cart'));
        case ITEM_DELETE:
            return state
                .set('loading', true)
                .set('error', false);
        case ITEM_DELETE_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', dataChecking(action, 'itemUpdate', 'cart'));
        case ITEM_DELETE_FAIL:
            return state
                .set('loading', false)
                .set('error', true)
                .set('data', dataChecking(action, 'itemUpdate', 'cart'));
        default:
            return state;
    }
}

export default checkoutPageReducer;
