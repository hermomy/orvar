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
                .set('orderList', action.data.items);
        case GET_ORDER_LIST_FAILED:
            return state
                .set('error', action.data.items)
                .set('loading', false)
                .set('orderList', null);
        default:
            return state;
    }
}

export default profileOrderListReducer;
