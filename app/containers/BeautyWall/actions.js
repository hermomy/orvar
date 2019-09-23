/*
 *
 * BeautyWall actions
 *
 */

import {
    GET_REVIEW,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILED,
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
