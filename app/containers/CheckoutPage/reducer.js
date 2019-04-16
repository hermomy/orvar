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
    QTY_UPDATE,
    QTY_UPDATE_SUCCESS,
    ITEM_DELETE,
    ITEM_DELETE_SUCCESS,
} from './constants';

export const initialState = fromJS({
    loading: false,
    error: false,
    data: null,
});

function checkoutPageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHECKOUT_DATA:
            return state
                .set('loading', true)
                .set('error', false);
        case CHECKOUT_DATA_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', action.r);
        case QTY_UPDATE:
            return state
                .set('loading', true)
                .set('error', false);
        case QTY_UPDATE_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', dataChecking(action, 'r', 'cart'));
        case ITEM_DELETE:
            return state
                .set('loading', true)
                .set('error', false);
        case ITEM_DELETE_SUCCESS:
            return state
                .set('loading', false)
                .set('error', false)
                .set('data', dataChecking(action, 'r', 'cart'));
        default:
            return state;
    }
}

export default checkoutPageReducer;
