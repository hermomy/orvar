/*
 *
 * FeedbackPage actions
 *
 */

import {
    POST_FEEDBACK,
    POST_FEEDBACK_SUCCESS,
    POST_FEEDBACK_FAIL,
} from './constants';

export function postFeedback(comment, suggestProduct, rate) {
    return {
        type: POST_FEEDBACK,
        comment,
        suggestProduct,
        rate,
    };
}

export function postFeedbackSuccess() {
    return {
        type: POST_FEEDBACK_SUCCESS,
    };
}

export function postFeedbackFail(error) {
    return {
        type: POST_FEEDBACK_FAIL,
        error,
    };
}
