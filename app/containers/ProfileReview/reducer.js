/*
 *
 * ProfileReview reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_REVIEW,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAIL,
    POST_REVIEW,
} from './constants';

export const initialState = fromJS({});

function profileReviewReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEW:
            return state
                .set('loading', true)
                .set('error', false);
        case GET_REVIEW_SUCCESS:
            return state
                .set('data', Object.assign({ ...state.get('data') }, action.payload))
                .set('loading', false)
                .set('error', false);
        case GET_REVIEW_FAIL:
            return state
                .set('loading', false)
                .set('error', false);
        case POST_REVIEW:
            return state
                .set('post', true)
                .set('loading', true)
                .set('error', false);
        default:
            return state;
    }
}

export default profileReviewReducer;
