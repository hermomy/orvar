/*
 *
 * ProfileOrder actions
 *
 */

import {
    GET_ORDER,
    GET_ORDER_DETAIL,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
} from './constants';

export function getOrder(category, numOfPage) {
    return {
        type: GET_ORDER,
        category,
        numOfPage,
    };
}

export function getOrderDetail(OrderDetailAPI, orderId) {
    return {
        type: GET_ORDER_DETAIL,
        OrderDetailAPI,
        orderId,
    };
}

export function getOrderSuccess(res) {
    return {
        type: GET_ORDER_SUCCESS,
        payload: res,
    };
}

export function getOrderFail(Error) {
    return {
        type: GET_ORDER_FAIL,
        Error,
    };
}
