/*
 *
 * BeautyWall actions
 *
 */

import {
    GET_REVIEW,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILED,
    GET_REVIEW_DETAILS,
    GET_REVIEW_DETAILS_SUCCESS,
    GET_REVIEW_DETAILS_FAILED,
    GET_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
} from './constants';

export function getReview(url) {
    return {
        type: GET_REVIEW,
        url,
    };
}

export function getReviewSuccess(reviewData) {
    return {
        type: GET_REVIEW_SUCCESS,
        reviewData,
    };
}
export function getReviewFailed(reviewData) {
    return {
        type: GET_REVIEW_FAILED,
        reviewData,
    };
}
export function getReviewDetails(id) {
    return {
        type: GET_REVIEW_DETAILS,
        id,
    };
}

export function getReviewDetailsSuccess(reviewDetailsData) {
    return {
        type: GET_REVIEW_DETAILS_SUCCESS,
        reviewDetailsData,
    };
}
export function getReviewDetailsFailed(reviewDetailsData) {
    return {
        type: GET_REVIEW_DETAILS_FAILED,
        reviewDetailsData,
    };
}
export function getOrder(url) {
    return {
        type: GET_ORDER,
        url,
    };
}

export function getOrderSuccess(orderData) {
    return {
        type: GET_ORDER_SUCCESS,
        orderData,
    };
}
export function getOrderFailed(orderData) {
    return {
        type: GET_ORDER_FAILED,
        orderData,
    };
}
