/*
 *
 * ProfileOrderList reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_ORDER_LIST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_FAILED,
} from './constants';

export const initialState = fromJS({
    orderList: null,
    orderMeta: null,
});

function profileOrderListReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_LIST:
            return state
                .set('error', false)
                .set('loading', true);
        case GET_ORDER_LIST_SUCCESS:
            return state
                .set('error', false)
                .set('loading', false)
                .set('orderList', action.data.items)
                .set('orderMeta', action.data._meta);
        case GET_ORDER_LIST_FAILED:
            return state
                .set('error', action.data.items)
                .set('loading', false)
                .set('orderList', null)
                .set('orderMeta', null);
        default:
            return state;
    }
}

export default profileOrderListReducer;
