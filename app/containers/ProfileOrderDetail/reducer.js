/*
 *
 * ProfileOrderDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_ORDER_LIST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_FAILED,
    GET_ORDER_DATA,
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_FAILED,
} from './constants';

export const initialState = fromJS({
    orderList: null,
    orderData: null,
});

function profileOrderDetailReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_LIST:
            return state
                .set('error', false)
                .set('loading', true);
        case GET_ORDER_LIST_SUCCESS:
            return state
                .set('error', false)
                .set('loading', false)
                .set('orderList', action.data.items);
        case GET_ORDER_LIST_FAILED:
            return state
                .set('error', action.data.items)
                .set('loading', false)
                .set('orderList', null);
        case GET_ORDER_DATA:
            return state
                .set('error', false)
                .set('loadingData', true);
        case GET_ORDER_DATA_SUCCESS:
            return state
                .set('error', false)
                .set('loadingData', false)
                .set('orderData', action.data);
        case GET_ORDER_DATA_FAILED:
            return state
                .set('error', action.data)
                .set('loadingData', false)
                .set('orderData', null);
        default:
            return state;
    }
}

export default profileOrderDetailReducer;
