/*
 *
 * ProfileOrderDetail actions
 *
 */

import {
    GET_ORDER_LIST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_FAILED,
    GET_ORDER_DATA,
    GET_ORDER_DATA_SUCCESS,
    GET_ORDER_DATA_FAILED,
} from './constants';

export function getOrderList() {
    return {
        type: GET_ORDER_LIST,
    };
}

export function getOrderListSuccess(response) {
    return {
        type: GET_ORDER_LIST_SUCCESS,
        data: response.data,
    };
}

export function getOrderListFailed(response) {
    return {
        type: GET_ORDER_LIST_FAILED,
        data: response.data,
    };
}

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
