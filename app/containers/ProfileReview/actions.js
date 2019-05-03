/*
 *
 * ProfileReview actions
 *
 */

import {
    GET_REVIEW,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAIL,
    POST_REVIEW,
} from './constants';

export function getReview(API, APIName, pageNum) {
    return {
        type: GET_REVIEW,
        pageNum,
        API,
        APIName,
    };
}

export function getReviewSuccess(res) {
    return {
        type: GET_REVIEW_SUCCESS,
        payload: res,
    };
}

export function getReviewFail(error) {
    return {
        type: GET_REVIEW_FAIL,
        error,
    };
}

export function postReview(rating, comment, wholeproduct) {
    return {
        type: POST_REVIEW,
        rating,
        comment,
        wholeproduct,
    };
}
