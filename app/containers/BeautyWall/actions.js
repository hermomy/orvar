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
    POST_LIKE,
    POST_LIKE_SUCCESS,
    POST_LIKE_FAILED,
    POST_SHOWOFF,
    POST_SHOWOFF_SUCCESS,
    POST_SHOWOFF_FAILED,
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
export function postLike(id) {
    return {
        type: POST_LIKE,
        id,
    };
}

export function postLikeSuccess(likeData) {
    return {
        type: POST_LIKE_SUCCESS,
        likeData,
    };
}
export function postLikeFailed(likeData) {
    return {
        type: POST_LIKE_FAILED,
        likeData,
    };
}
export function postShowOff(data) {
    return {
        type: POST_SHOWOFF,
        data,
    };
}

export function postShowOffSuccess(showOffData) {
    return {
        type: POST_SHOWOFF_SUCCESS,
        showOffData,
    };
}
export function postShowOffFailed(showOffData) {
    return {
        type: POST_SHOWOFF_FAILED,
        showOffData,
    };
}

