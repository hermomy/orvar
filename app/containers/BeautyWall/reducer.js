/*
 *
 * BeautyWall reducer
 *
 */

import { fromJS } from 'immutable';
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

export const initialState = fromJS({
    data: null,
    review: {
        loading: false,
        error: false,
        success: false,
    },
    order: {
        loading: false,
        error: false,
        success: false,
    },
    reviewDetails: {
        loading: false,
        error: false,
        success: false,
    },
});

function beautyWallReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEW:
            return state
                .setIn(['review', 'loading'], true)
                .setIn(['review', 'error'], false)
                .set('data', null);
        case GET_REVIEW_SUCCESS:
            return state
                .setIn(['review', 'success'], true)
                .setIn(['review', 'loading'], false)
                .setIn(['review', 'error'], false)
                .set('data', action.reviewData);
        case GET_REVIEW_FAILED:
            return state
                .setIn(['review', 'loading'], false)
                .setIn(['review', 'error'], true)
                .set('data', null);
        case GET_REVIEW_DETAILS:
            return state
                .setIn(['reviewDetails', 'loading'], true)
                .setIn(['reviewDetails', 'error'], false)
                .setIn(['reviewDetails', 'data'], null);
        case GET_REVIEW_DETAILS_SUCCESS:
            return state
                .setIn(['reviewDetails', 'success'], true)
                .setIn(['reviewDetails', 'loading'], false)
                .setIn(['reviewDetails', 'error'], false)
                .setIn(['reviewDetails', 'data'], action.reviewDetailsData);
        case GET_REVIEW_DETAILS_FAILED:
            return state
                .setIn(['reviewDetails', 'loading'], false)
                .setIn(['reviewDetails', 'error'], true)
                .setIn(['reviewDetails', 'data'], action.reviewDetailsData);
        case GET_ORDER:
            return state
                .setIn(['order', 'loading'], true)
                .setIn(['order', 'error'], false)
                .setIn(['order', 'data'], null);
        case GET_ORDER_SUCCESS:
            return state
                .setIn(['order', 'success'], true)
                .setIn(['order', 'loading'], false)
                .setIn(['order', 'error'], false)
                .setIn(['order', 'data'], action.orderData);
        case GET_ORDER_FAILED:
            return state
                .setIn(['order', 'loading'], false)
                .setIn(['order', 'error'], true)
                .setIn(['order', 'data'], action.orderData);
        default:
            return state;
    }
}

export default beautyWallReducer;
