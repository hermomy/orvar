/*
 *
 * ProfileOrderList actions
 *
 */

import {
    GET_ORDER_LIST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_FAILED,

    CONFIRM_ORDER,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAILED,
    SUBMIT_REVIEW,
    SUBMIT_REVIEW_SUCCESS,
    SUBMIT_REVIEW_FAILED,
} from './constants';

export function getOrderList({ urlParam, orderCount, pageCount }) {
    return {
        type: GET_ORDER_LIST,
        urlParam,
        orderCount,
        pageCount,
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

export function confirmOrder({ orderID, successCallback }) {
    return {
        type: CONFIRM_ORDER,
        orderID,
        successCallback,
    };
}

export function confirmOrderSuccess(response) {
    return {
        type: CONFIRM_ORDER_SUCCESS,
        data: response.data,
    };
}

export function confirmOrderFailed(response) {
    return {
        type: CONFIRM_ORDER_FAILED,
        data: response.data,
    };
}

export function submitReview({ comment, fileString, orderID, successCallback }) {
    return {
        type: SUBMIT_REVIEW,
        comment,
        fileString,
        orderID,
        successCallback,
    };
}

export function submitReviewSuccess(response) {
    return {
        type: SUBMIT_REVIEW_SUCCESS,
        data: response.data,
    };
}

export function submitReviewFailed(response) {
    return {
        type: SUBMIT_REVIEW_FAILED,
        data: response.data,
    };
}
