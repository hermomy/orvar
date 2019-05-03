/*
 *
 * FeedbackPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    POST_FEEDBACK,
    POST__FEEDBACK_SUCCESS,
    POST_FEEDBACK_FAIL,
} from './constants';

export const initialState = fromJS({});

function feedbackPageReducer(state = initialState, action) {
    switch (action.type) {
        case POST_FEEDBACK:
            return state
                .set('loading', true)
                .set('success', false);
        case POST__FEEDBACK_SUCCESS:
            return state
                .set('loading', false)
                .set('success', true);
        case POST_FEEDBACK_FAIL:
            return state
                .set('error', action.data)
                .set('loading', false)
                .set('success', true);
        default:
            return state;
    }
}

export default feedbackPageReducer;
