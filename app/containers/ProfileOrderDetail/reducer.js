/*
 *
 * ProfileOrderDetail reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_ORDER_DATA,
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_FAILED,
} from './constants';

export const initialState = fromJS({
    orderData: null,
});

function profileOrderDetailReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDER_DATA:
            return state
                .set('error', false)
                .set('loading', true);
        case GET_ORDER_DATA_SUCCESS:
            return state
                .set('error', false)
                .set('loading', false)
                .set('orderData', action.data);
        case GET_ORDER_DATA_FAILED:
            return state
                .set('error', action.data)
                .set('loading', false)
                .set('orderData', null);
        default:
            return state;
    }
}

export default profileOrderDetailReducer;
