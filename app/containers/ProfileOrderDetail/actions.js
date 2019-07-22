/*
 *
 * ProfileOrderDetail actions
 *
 */

import {
    GET_ORDER_DATA,
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_FAILED,
} from './constants';

export function getOrderData(orderID) {
    return {
        type: GET_ORDER_DATA,
        orderID,
    };
}

export function getOrderDataSuccess(response) {
    return {
        type: GET_ORDER_DATA_SUCCESS,
        data: response.data,
    };
}

export function getOrderDataFailed(response) {
    return {
        type: GET_ORDER_DATA_FAILED,
        data: response.data,
    };
}
