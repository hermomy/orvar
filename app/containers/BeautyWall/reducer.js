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
} from './constants';

export const initialState = fromJS({
    data: null,
    review: {
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
        default:
            return state;
    }
}

export default beautyWallReducer;
